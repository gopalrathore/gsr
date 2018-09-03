import { FormsModule } from '@angular/forms';
import { SupportRoutes } from './support.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { AddTicketComponent } from './support-ticket/add-ticket/add-ticket.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SupportRoutes),
  ],
  declarations: [SupportTicketComponent, AddTicketComponent]
})
export class SupportModule { }
