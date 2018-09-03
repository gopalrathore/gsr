import { AddGstinComponent } from './add-gstin.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [ AddGstinComponent],
  exports: [ AddGstinComponent ]
})

export class AddGstinModule { }
