import { ToolPaymentRoutes } from './tool-payment.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ToolPaymentRoutes),
  ],
  declarations: [PaymentComponent]
})
export class ToolPaymentModule { }
