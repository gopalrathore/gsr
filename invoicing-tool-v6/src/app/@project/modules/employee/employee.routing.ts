import { EditEmployeeComponent } from './add-employee/edit-employee.component';
import { EmployeeComponent } from './employee.component';
import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

export const EmployeeRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: EmployeeComponent,
        data: {
            title: "List Employees",
            metaDescription: "meta desc"
        }
    },{
        path: 'add-employee',
        component: AddEmployeeComponent,
        data: {
            title: "Add Employee",
            metaDescription: "meta desc"
        }
    },{
        path: 'edit-employee',
        component: EditEmployeeComponent,
        data: {
            title: "Edit Employee",
            metaDescription: "meta desc"
        }
    }]
}];