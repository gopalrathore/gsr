import { EditExpenseComponent } from './add-expenses/edit-expense.component';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { ExpensesComponent } from './expenses.component';
import { Routes } from '@angular/router';

export const expensesRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: ExpensesComponent,
        data: {
            title: "List Expenses",
            metaDescription: "meta desc"
        }
    },{
        path: 'add-expenses',
        component: AddExpensesComponent,
        data: {
            title: "Add Expenses",
            metaDescription: "meta desc"
        }
    },{
        path: 'edit-expenses',
        component: EditExpenseComponent,
        data: {
            title: "Edit Expenses",
            metaDescription: "meta desc"
        }
    }]
}];
