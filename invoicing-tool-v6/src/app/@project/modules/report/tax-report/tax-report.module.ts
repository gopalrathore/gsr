import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { TaxReportRoutes } from './tax-report.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GstLedgerComponent } from './gst-ledger/gst-ledger.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    RouterModule.forChild(TaxReportRoutes),
    FormsModule
  ],
  declarations: [GstLedgerComponent]
})
export class TaxReportModule { }
