import { GstLedgerComponent } from './gst-ledger/gst-ledger.component';
import { Routes } from '@angular/router';

export const TaxReportRoutes: Routes = [{
    path: '',
    children: [{
            path: 'gst-ledger-report',
            component: GstLedgerComponent
        }
    ]
}];
