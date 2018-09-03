import { CalendarModule } from 'primeng/primeng';
import { EditEmployeeComponent } from './add-employee/edit-employee.component';
import { EmployeeRoutes } from './employee.routing';
import { EmployeeComponent } from './employee.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FileUploadModule } from '../../../@theme/shared/file-upload/file-upload.module';


@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(EmployeeRoutes),
      FormsModule,
      CalendarModule,
      FileUploadModule
  ],
  declarations: [EmployeeComponent, AddEmployeeComponent, EditEmployeeComponent]
})
export class EmployeeModule { }
