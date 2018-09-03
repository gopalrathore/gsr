import { Routes } from '@angular/router';

import { BankComponent } from './bank.component';
import { AddBankComponent } from './add-bank/add-bank.component'
import { EditBankComponent } from './add-bank/edit-bank.component'

export const BankRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: BankComponent
    },{
        path: 'add-bank',
        component: AddBankComponent
    },{
        path: 'edit-bank',
        component: EditBankComponent
    }]
}];
