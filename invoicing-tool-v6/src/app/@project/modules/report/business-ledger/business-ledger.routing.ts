import { VendorLedgerComponent } from './vendor-ledger/vendor-ledger.component';
import { DebitorLedgerComponent } from './debitor-ledger/debitor-ledger.component';
import { CreditorLedgerComponent } from './creditor-ledger/creditor-ledger.component';
import { ClientLedgerComponent } from './client-ledger/client-ledger.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

export const BusinessLedgerRoutes: Routes = [{
    path: '',
    children: [{
        path: 'client-ledger',
        component: ClientLedgerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'creditor-ledger',
        component: CreditorLedgerComponent,
        canActivate: [AuthGuard]
    },
    {
      path: 'debitor-ledger',
      component: DebitorLedgerComponent,
      canActivate: [AuthGuard]
    },
    {
        path: 'vendor-ledger',
        component: VendorLedgerComponent,
        canActivate: [AuthGuard]
    }]
}];
