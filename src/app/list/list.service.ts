import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tryCatch } from '@thalesrc/js-utils';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { startWith, debounceTime, switchMap, shareReplay, pluck, distinctUntilChanged, mapTo, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RouterDataService } from '../shared/services/router-data.service';
import { purify } from '../utils/purify';
import { ArticleModel, ServerArticleModel, UpsertArticleModel } from './models';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { shareLast } from '../utils/rx/share-last';

export interface ArticleFilter {
  searchText: string;
}


export const DEFAULT_ARTICLE_REQUEST_FILTERS: ArticleFilter = {
  searchText: null
};

@Injectable({
  providedIn: 'root'
})
export class ListService {

  public static PATH = `${environment.api}/articles`;

  public initFilter$ = new BehaviorSubject<ArticleFilter>(DEFAULT_ARTICLE_REQUEST_FILTERS);
  public refreshArticle$ = new Subject<void>();


  public requestArticle$ = new Subject<ArticleFilter>();
  public articles$: Observable<ArticleModel[]> = this.requestArticle$.pipe(
    startWith({ ...this.initFilter$.value }),
    debounceTime(300),
    switchMap((filters) => this.getArticles(filters)),
    shareReplay({ refCount: false, bufferSize: 1 })
  );


  public activeArticle$: Observable<ArticleModel> = this.routerData.params$.pipe(
    pluck('articleId'),
    distinctUntilChanged(),
    switchMap((id) => this.refreshArticle$.pipe(mapTo(id), startWith(id))),
    switchMap(async (articleId) => {
      if (!articleId) {
        return null;
      }
      const [error, result] = await tryCatch(this.getArticleDetail(articleId));
      if (error) {
        console.error(error);
        return null;
      }
      return result;
    }),
    startWith(null),
    shareLast()
  );


  constructor(
    private http: HttpClient,
    private routerData: RouterDataService,
    private notificationService: NzNotificationService
  ) { }

  public async getArticles(filters: ArticleFilter): Promise<ArticleModel[]> {
    const result = await this.http.get<ServerArticleModel[]>(`${ListService.PATH}`, { params: { ...filters } }).toPromise();
    return result.map(article => ArticleModel.fromServerData(article));
  }


  private async getArticleDetail(articleId: number): Promise<ArticleModel> {
    const result = await this.http.get<ServerArticleModel>(`${ListService.PATH}/${articleId}`).toPromise();
    return ArticleModel.fromServerData(result);
  }


  public async update(data: Partial<ArticleModel> & { id: ArticleModel['id'] }): Promise<{ id: number }> {
    const payload = purify(UpsertArticleModel.fromClientData(data));
    const id = await this.http.put<number>(`${ListService.PATH}/${data.id}`, payload).pipe(catchError(err => of(err))).toPromise();
    this.notificationService.create(
      'success',
      'Article Updated!',
      '',
    );
    this.requestArticle$.next();
    this.requestArticle$.next(this.initFilter$.value);
    return { id };
  }

  public async create(data: Partial<ArticleModel>): Promise<{ id: number }> {
    const payload = purify(UpsertArticleModel.fromClientData(data));
    const id = await this.http.post<number>(`${ListService.PATH}`, payload).toPromise();
    this.notificationService.create(
      'success',
      'Created a new Article!',
      '',
    );
    this.requestArticle$.next(this.initFilter$.value);
    return { id };
  }


  public async delete(id: number): Promise<{ id: number }> {
    await this.http.delete<number>(`${ListService.PATH}/${id}`).toPromise();
    this.notificationService.create(
      'success',
      'Deleted Article!',
      '',
    );
    this.requestArticle$.next(this.initFilter$.value);
    return { id };
  }

}
