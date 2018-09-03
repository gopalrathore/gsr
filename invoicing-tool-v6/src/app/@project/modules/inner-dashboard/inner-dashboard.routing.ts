import { InnerDashboardComponent } from './inner-dashboard.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';

export const InnerDashboardRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: InnerDashboardComponent,
        canActivate: [AuthGuard]
    }
  ]
}];
