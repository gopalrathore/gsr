import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { InnerDashboardRoutes } from './inner-dashboard.routing';
import { InnerDashboardComponent } from './inner-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../auth.guard';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    RouterModule.forChild(InnerDashboardRoutes),
  ],
  declarations: [InnerDashboardComponent],
  providers: [
    AuthGuard
  ]
})
export class InnerDashboardModule { }
