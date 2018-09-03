import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AddVendorComponent],
  exports: [ AddVendorComponent ]
})
export class AddVendorModule { }
