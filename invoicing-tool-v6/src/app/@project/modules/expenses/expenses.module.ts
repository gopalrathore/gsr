import { AddVendorModule } from './../../../@theme/shared/add-vendor/add-vendor.module';
import { AddClientModule } from './../../../@theme/shared/add-client/add-client.module';
import { CalendarModule, InputSwitchModule, AutoCompleteModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { expensesRoutes } from './expenses.routing';
import { EditExpenseComponent } from './add-expenses/edit-expense.component';
import { ExpensesComponent } from './expenses.component';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { GrowlModule} from 'primeng/primeng';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { FileUploadModule } from '../../../@theme/shared/file-upload/file-upload.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(expensesRoutes),
    FormsModule,
    CalendarModule,
    InputSwitchModule,
    AutoCompleteModule,
    CheckboxModule,
    FileUploadModule,
    GrowlModule,
    AddClientModule,
    AddVendorModule
  ],
  declarations: [ExpensesComponent, AddExpensesComponent, EditExpenseComponent]
})
export class ExpensesModule { }
