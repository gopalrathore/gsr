import { RegisterRoutes } from './register.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReportInvoiceComponent } from './sales-report-invoice/sales-report-invoice.component';
import { SalesReportItemComponent } from './sales-report-item/sales-report-item.component';
import { CalendarModule, CheckboxModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoutes),
    CalendarModule,
    CheckboxModule,
    FormsModule
    
  ],
  declarations: [SalesReportInvoiceComponent, SalesReportItemComponent]
})
export class RegisterModule { }
