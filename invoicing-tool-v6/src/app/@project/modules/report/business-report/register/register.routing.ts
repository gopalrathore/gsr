import { SalesReportItemComponent } from './sales-report-item/sales-report-item.component';
import { SalesReportInvoiceComponent } from './sales-report-invoice/sales-report-invoice.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';

export const RegisterRoutes: Routes = [{
    path: '',
    children: [{
        path: 'sales-report-invoice',
        component: SalesReportInvoiceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sales-report-item',
        component: SalesReportItemComponent,
        canActivate: [AuthGuard]
    }]
}];
