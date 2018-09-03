import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxLedgerRoutes } from './tax-ledger.routing';
import { CalendarModule, CheckboxModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { CessComponent } from './cess/cess.component';
import { CgstComponent } from './cgst/cgst.component';
import { IgstComponent } from './igst/igst.component';
import { SgstComponent } from './sgst/sgst.component';
import { TdsComponent } from './tds/tds.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TaxLedgerRoutes),
    CalendarModule,
    CheckboxModule,
    FormsModule
  ],
  declarations: [CessComponent, CgstComponent, IgstComponent, SgstComponent, TdsComponent]
})
export class TaxLedgerModule { }
