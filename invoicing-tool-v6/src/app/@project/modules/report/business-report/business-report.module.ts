import { BusinessReportRoutes } from './business-report.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BusinessReportRoutes)
  ],
  declarations: []
})
export class BusinessReportModule { }
