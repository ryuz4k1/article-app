import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoutingModule } from './create-routing.module';
import { AddComponent } from './components/add/add.component';
import { ListModule } from '../list/list.module';



@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    ListModule
  ],
  exports: [
    AddComponent
  ]
})
export class CreateModule { }
