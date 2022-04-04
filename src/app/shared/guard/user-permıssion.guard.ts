import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserPermissionGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  public async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const activeUser = await this.userService.activeUser$.pipe(first()).toPromise();
    if (!activeUser) {
      await this.router.navigate(['/list'], {relativeTo: this.route});
    } else {
      return true;
    }
  }

}
