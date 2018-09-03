import { TutorialsComponent } from './tutorials/tutorials.component';
import { TncComponent } from './tnc/tnc.component';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { AuditLogsComponent } from './audit-logs/audit-logs.component';
import { Routes } from '@angular/router';


export const SupportRoutes: Routes = [{
    path: '',
    children: [{
        path: 'audit-log',
        component: AuditLogsComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'guidelines',
        component: GuidelinesComponent,
        // canActivate: [AuthGuard]
    },
    {
      path: 'support-ticket',
      component: SupportTicketComponent,
    //   canActivate: [AuthGuard]
    },
    {
        path: 'terms-and-condition',
        component: TncComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'tutorials',
        component: TutorialsComponent,
        // canActivate: [AuthGuard]
    }]
}];
