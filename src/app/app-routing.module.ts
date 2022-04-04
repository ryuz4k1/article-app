import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './enums';
import { UserPermissionGuard } from './shared/guard/user-permıssion.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: Pages.List,
    pathMatch: 'full',
  },
  {
    path: Pages.Create,
    loadChildren: () => import('./create/create.module').then(m => m.CreateModule),
    canActivate: [UserPermissionGuard]
  },
  {
    path: Pages.List,
    loadChildren: () => import('./list/list.module').then(m => m.ListModule),
  },
  {
    // otherwise redirect to list
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
