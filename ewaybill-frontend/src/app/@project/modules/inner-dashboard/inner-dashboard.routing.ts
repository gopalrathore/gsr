import { InnerDashboardComponent } from './inner-dashboard.component';
import { Routes } from '@angular/router';

export const InnerDashboardRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: InnerDashboardComponent
    }
  ]
}];
