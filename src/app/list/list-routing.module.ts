import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from '../enums';
import { AddComponent } from '../create/components/add/add.component';
import { ContainerComponent } from './container/container.component';
import { ListComponent } from './list.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  {
    path: '', component: ContainerComponent,
    children: [
      { path: '', component: ListComponent },
      { path: Pages.Detail, component: DetailComponent },
      { path: Pages.Edit, component: EditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
