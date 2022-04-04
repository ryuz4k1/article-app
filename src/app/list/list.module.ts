import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ListComponent } from './list.component';
import { NgModule } from '@angular/core';

import { ListRoutingModule } from './list-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from './container/container.component';
import { FormComponent } from './components/form/form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SortByIdPipe } from './pipes/sort-by.pipe';

@NgModule({
  declarations: [

    // Components
    DetailComponent,
    ListComponent,
    FormComponent,
    ContainerComponent,
    EditComponent,

    // Pipes
    SortByIdPipe
  ],
  imports: [
    ListRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ScrollingModule,
    NzModalModule
  ],
  exports: [
    FormComponent
  ]
})
export class ListModule {}
