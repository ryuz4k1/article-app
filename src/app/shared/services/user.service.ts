import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { startWith, debounceTime, switchMap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServerUserModel, UserModel } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public static PATH = `${environment.api}/users`;
  public activeUser$ = new BehaviorSubject<UserModel>(null);

  public requestUsers$ = new Subject<void>();
  public users$: Observable<UserModel[]> = this.requestUsers$.pipe(
    startWith({}),
    debounceTime(300),
    switchMap((_) => this.getUsers()),
    shareReplay({ refCount: false, bufferSize: 1 })
  );

  constructor(private http: HttpClient) { }

  public async getUsers(): Promise<UserModel[]> {
    const result = await this.http.get<ServerUserModel[]>(`${UserService.PATH}`, { params: {} }).toPromise();
    return result.map(article => UserModel.fromServerData(article));
  }
}
