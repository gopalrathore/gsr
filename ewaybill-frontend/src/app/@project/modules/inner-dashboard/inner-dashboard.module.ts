import { AddGstinModule } from '../shared/add-gstin/add-gstin.module';
import { AddGstinComponent } from '../shared/add-gstin/add-gstin.component';
import { FooterModule } from '../shared/footer/footer.module';

import { RouterModule } from '@angular/router';
import { InnerDashboardRoutes } from './inner-dashboard.routing';
import { InnerDashboardComponent } from './inner-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FooterModule,
    RouterModule.forChild(InnerDashboardRoutes),
    AddGstinModule
  ],
  declarations: [InnerDashboardComponent],
  providers: [ ]
})
export class InnerDashboardModule { }
