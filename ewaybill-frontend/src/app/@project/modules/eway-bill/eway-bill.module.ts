import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ewayBillRoutes } from './eway-bill.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateNewComponent } from './generate-new/generate-new.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { EwaybillListComponent } from './ewaybill-list/ewaybill-list.component';
import { UpdatePartBComponent } from './ewaybill-list/update-part-b/update-part-b.component';
import { CancelBillComponent } from './ewaybill-list/cancel-bill/cancel-bill.component';
import { GovLoginPageComponent } from './gov-login-page/gov-login-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ewayBillRoutes),
    CalendarModule,
    RadioButtonModule
  ],
  declarations: [GenerateNewComponent, EwaybillListComponent, UpdatePartBComponent, CancelBillComponent, GovLoginPageComponent]
})

export class EwayBillModule { }
