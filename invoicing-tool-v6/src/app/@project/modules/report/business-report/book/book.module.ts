import { BookRoutes } from './book.routing';
import { RouterModule } from '@angular/router';
import { CashBookComponent } from './cash-book/cash-book.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankBookComponent } from './bank-book/bank-book.component';
import { CalendarModule, CheckboxModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/components/chips/chips';
import { BankCashBookComponent } from './bank-cash-book/bank-cash-book.component';
import { ExpenseComponent } from './expense/expense.component';
import { GoodsServiceComponent } from './goods-service/goods-service.component';
import { PaymentComponent } from './payment/payment.component';
import { PurchaseRegisterItemComponent } from './purchase-register-item/purchase-register-item.component';
import { PurchaseRegisterInvoiceComponent } from './purchase-register-invoice/purchase-register-invoice.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BookRoutes),
    CalendarModule,
    CheckboxModule,
    FormsModule,
    ChipsModule
  ],
  declarations: [BankBookComponent, CashBookComponent, BankCashBookComponent, ExpenseComponent, GoodsServiceComponent, PaymentComponent, PurchaseRegisterItemComponent, PurchaseRegisterInvoiceComponent, ReceiptComponent, StockAdjustmentComponent]
})
export class BookModule { }
