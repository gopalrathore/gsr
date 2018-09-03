import { ReportRoutes } from './report.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportLayoutComponent } from './report-layout/report-layout.component';
import { ReportListingComponent } from './report-listing/report-listing.component';
import { CalendarModule, CheckboxModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/components/chips/chips';
import { AuthGuard } from './auth.guard';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes),
    CalendarModule,
    CheckboxModule,
    FormsModule,
    ChipsModule
  ],
  declarations: [ReportLayoutComponent, ReportListingComponent],
  providers: [  
    AuthGuard,

  ],
})
export class ReportModule { }
