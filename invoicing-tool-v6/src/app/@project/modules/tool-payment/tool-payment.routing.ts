import { PaymentComponent } from './payment/payment.component';
import { Routes } from '@angular/router';


export const ToolPaymentRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: PaymentComponent
    }]
}];
