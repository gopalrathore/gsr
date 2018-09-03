import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BankComponent } from './bank.component';
import { BankRoutes } from './bank.routing';
import { AddBankComponent } from './add-bank/add-bank.component';
import { EditBankComponent } from './add-bank/edit-bank.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BankRoutes),
        FormsModule
    ],
    declarations: [BankComponent, AddBankComponent, EditBankComponent]
})

export class BankModule {}
