import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ListService } from 'src/app/list/list.service';
import { ArticleModel } from 'src/app/list/models';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private service: ListService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  public async createArticle(articleData: ArticleModel) {
    this.loading$.next(true);
    const result = await this.service.create(articleData);
    console.log(result);
    this.loading$.next(false);
    await this.router.navigate(['./list']);
  }

}
