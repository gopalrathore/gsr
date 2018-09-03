import { Routes } from '@angular/router';
import { CessComponent } from './cess/cess.component';
import { CgstComponent } from './cgst/cgst.component';
import { IgstComponent } from './igst/igst.component';
import { AuthGuard } from '../../../auth.guard';
import { SgstComponent } from './sgst/sgst.component';
import { TdsComponent } from './tds/tds.component';

export const TaxLedgerRoutes: Routes = [{
    path: '',
    children: [
      {
        path: 'cess',
        component: CessComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cgst',
        component: CgstComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'igst',
        component: IgstComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sgst',
        component: SgstComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tds',
        component: TdsComponent,
        canActivate: [AuthGuard]
    }
    ]
}];
