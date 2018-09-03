import { Routes } from '@angular/router';

export const BusinessReportRoutes: Routes = [{
    path: '',
    children: [{
        path: 'book',
        loadChildren: './book/book.module#BookModule'
        },{
            path: 'register',
            loadChildren: './register/register.module#RegisterModule'
        }
    ]
}];
