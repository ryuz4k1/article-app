import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ListService } from '../../list.service';
import { ArticleModel } from '../../models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public activeArticle$ = this.service.activeArticle$;

  constructor(private service: ListService) { }

  public ngOnInit(): void {
  }


  public async updateArticle(articleData: ArticleModel) {
    const activeArticle = await this.activeArticle$.pipe(first()).toPromise();
    this.service.update({ id: activeArticle.id, ...articleData });
  }

}
