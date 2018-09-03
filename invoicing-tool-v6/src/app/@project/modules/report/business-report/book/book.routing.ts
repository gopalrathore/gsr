import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';
import { PurchaseRegisterItemComponent } from './purchase-register-item/purchase-register-item.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { PurchaseRegisterInvoiceComponent } from './purchase-register-invoice/purchase-register-invoice.component';
import { PaymentComponent } from './payment/payment.component';
import { GoodsServiceComponent } from './goods-service/goods-service.component';
import { ExpenseComponent } from './expense/expense.component';
import { BankCashBookComponent } from './bank-cash-book/bank-cash-book.component';
import { CashBookComponent } from './cash-book/cash-book.component';
import { BankBookComponent } from './bank-book/bank-book.component';

import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';

export const BookRoutes: Routes = [{
    path: '',
    children: [{
        path: 'bank-book',
        component: BankBookComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cash-book',
        component: CashBookComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bank-cash-book',
        component: BankCashBookComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'expense',
        component: ExpenseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'goods-service',
        component: GoodsServiceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'payment-report',
        component: PaymentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'purchase-register-invoice-wise',
        component: PurchaseRegisterInvoiceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'purchase-register-item-wise',
        component: PurchaseRegisterItemComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'receipt-report',
        component: ReceiptComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'stock-adjustment',
        component: StockAdjustmentComponent,
        canActivate: [AuthGuard]
    }]
}];
