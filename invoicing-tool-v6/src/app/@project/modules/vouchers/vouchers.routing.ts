import { Routes } from '@angular/router';

import { RecieptVouchersComponent } from './reciept-vouchers/reciept-vouchers.component';
import { RecieptVoucherTransactionComponent } from './reciept-vouchers/reciept-voucher-transaction/reciept-voucher-transaction.component';
import { PaymentVouchersComponent } from './payment-vouchers/payment-vouchers.component';
import { PaymentVoucherTransactionComponent } from './payment-vouchers/payment-voucher-transaction/payment-voucher-transaction.component';
import { AddRecieptVoucherComponent } from './reciept-vouchers/add-reciept-voucher/add-reciept-voucher.component';
import { AddPaymentVoucherComponent } from './payment-vouchers/add-payment-voucher/add-payment-voucher.component';


export const VouchersRoutes: Routes = [{
    path: '',
    children: [
    {
        path: 'receipt',
        component: RecieptVouchersComponent
    },
    {
        path: 'receipt/transaction',
        component: RecieptVoucherTransactionComponent
    },
    {
        path: 'receipt/add',
        component: AddRecieptVoucherComponent
    },
    {
        path: 'payment',
        component: PaymentVouchersComponent
    },
    {
        path: 'payment/transaction',
        component: PaymentVoucherTransactionComponent
    },
    {
        path: 'payment/add',
        component: AddPaymentVoucherComponent
    }
  ]
}];
