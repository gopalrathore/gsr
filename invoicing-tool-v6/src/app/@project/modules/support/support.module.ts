import { FormsModule } from '@angular/forms';
import { SupportRoutes } from './support.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { AuditLogsComponent } from './audit-logs/audit-logs.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { TncComponent } from './tnc/tnc.component';
import { AddSupportTicketComponent } from './support-ticket/add-support-ticket/add-support-ticket.component';
import {CalendarModule} from 'primeng/calendar';
import { LogComponent } from './audit-logs/log/log.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SupportRoutes),
    FormsModule,
    CalendarModule
  ],
  declarations: [SupportTicketComponent, AuditLogsComponent, TutorialsComponent, GuidelinesComponent, TncComponent, AddSupportTicketComponent, LogComponent]
})
export class SupportModule { }
