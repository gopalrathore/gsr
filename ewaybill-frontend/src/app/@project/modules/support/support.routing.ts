import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { Routes } from '@angular/router';

export const SupportRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: SupportTicketComponent
    }]
}];
