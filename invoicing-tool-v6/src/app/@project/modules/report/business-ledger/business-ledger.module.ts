import { BusinessLedgerRoutes } from './business-ledger.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLedgerComponent } from './client-ledger/client-ledger.component';
import { CreditorLedgerComponent } from './creditor-ledger/creditor-ledger.component';
import { DebitorLedgerComponent } from './debitor-ledger/debitor-ledger.component';
import { VendorLedgerComponent } from './vendor-ledger/vendor-ledger.component';
import { CalendarModule, CheckboxModule, AutoCompleteModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/components/chips/chips';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BusinessLedgerRoutes),
    CalendarModule,
    AutoCompleteModule,
    CheckboxModule,
    FormsModule,
    ChipsModule
  ],
  declarations: [ClientLedgerComponent, CreditorLedgerComponent, DebitorLedgerComponent, VendorLedgerComponent]
})
export class BusinessLedgerModule { }
