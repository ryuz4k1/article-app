import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { ArticleModel } from '../../models';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  public article$ = new BehaviorSubject<ArticleModel>(null);
  public loading$ = new BehaviorSubject<boolean>(false);

  // tslint:disable-next-line:no-output-rename
  @Output('formSubmit')
  public formSubmit = new EventEmitter<unknown>();

  @Input('loading')
  public set _loading(loading: boolean) {
    this.loading$.next(loading);
  }

  @ViewChild('form', { static: true })
  public form: NgForm;

  @Input('article')
  public set _article(article: ArticleModel) {
    this.article$.next(article || new ArticleModel());
  }


  constructor(private userService: UserService) { }


  public async submit(value: ArticleModel, form: NgForm) {
    if (!form.valid) {
      return;
    }
    const activeUser = await this.userService.activeUser$.pipe(first()).toPromise();
    this.formSubmit.next({
      ...value,
      createdDate: new Date(),
      author: activeUser.username
    });
  }
}
