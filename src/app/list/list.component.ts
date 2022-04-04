import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListService } from './list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { UserModel } from '../shared/models/user.models';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  public articles$ = this.service.articles$;
  public users$ = this.userService.users$;
  public activeUser$ = this.userService.activeUser$;

  @ViewChild('checkModal', {static: true})
  public modal: NzModalComponent;

  public modalLoading = false;

  public userInfo$ = new BehaviorSubject<UserModel>(null);

  constructor(
    private service: ListService,
    private userService: UserService,
    private router: Router,
    private notificationService: NzNotificationService,
    private route: ActivatedRoute
  ) {
    this.subs.add(
      this.userService.users$.subscribe(_ => {})
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public async ngOnInit() {
  }


  public async addArticle() {
    const activeUser = await this.userService.activeUser$.pipe(first()).toPromise();
    if (activeUser) {
      this.router.navigate(['../add'], {relativeTo: this.route});
    } else {
      this.modal.open();
    }
  }

  public async detailArticle(id: number, event: any) {
    event.stopPropagation();
    const activeUser = await this.userService.activeUser$.pipe(first()).toPromise();
    if (activeUser) {
      this.router.navigate(['./edit', id], {relativeTo: this.route});
    } else {
      this.router.navigate(['./detail', id], {relativeTo: this.route});
    }
  }

  public async deleteArticle(id: number, event: any) {
    event.stopPropagation();
    this.service.delete(id);
  }

  public async okay(userCheckForm: NgForm) {
    const users = await this.userService.users$.pipe(first()).toPromise();
    const checkUser = users.find(user => user.username === userCheckForm.value.username && user.password === userCheckForm.value.password);
    if (!checkUser) {
      this.notificationService.create(
        'error',
        'Username or password is incorrect!',
        '',
      );
      return;
    }
    await this.userService.activeUser$.next(checkUser);
    await this.modal.close();
    await this.router.navigate(['../add'], {relativeTo: this.route});
  }

  public cancel() {
    this.modal.close();
  }
}
