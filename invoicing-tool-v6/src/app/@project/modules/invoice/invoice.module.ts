import { NewInventoryComponent } from './sales/quick-add/new-inventory/new-inventory.component';
import { NewClientComponent } from './sales/quick-add/new-client/new-client.component';
import { InvoiceNumberSettingComponent } from './sales/quick-add/invoice-number-setting/invoice-number-setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RetailInvoiceComponent } from './sales/retail-invoice/retail-invoice.component';
import { SaveInvoiceComponent } from './sales/save-invoice/save-invoice.component';
import { TaxInvoiceComponent } from './sales/tax-invoice/tax-invoice.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InvoiceRoutes } from './invoice.routing';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { BillOfSupplyComponent } from './sales/bill-of-supply/bill-of-supply.component';
import { ReceiptVoucherComponent } from './sales/receipt-voucher/receipt-voucher.component';
import { RefundVoucherComponent } from './sales/refund-voucher/refund-voucher.component';
import { PaymentVoucherComponent } from './sales/payment-voucher/payment-voucher.component';
import { CreditComponent } from './sales/credit/credit.component';
import { DebitComponent } from './sales/debit/debit.component';
import { ReviseInvoiceComponent } from './sales/revise-invoice/revise-invoice.component';
import { DeliveryChallanComponent } from './sales/delivery-challan/delivery-challan.component';
import { TradeDeliveryComponent } from './sales/trade-delivery/trade-delivery.component';
import { PurchaseInvoiceComponent } from './purchase/purchase-invoice/purchase-invoice.component';
import { ExportInvoiceComponent } from './sales/export-invoice/export-invoice.component';


import { CalendarModule, AutoCompleteModule, MultiSelectModule, CheckboxModule } from 'primeng/primeng';
import { NewVendorComponent } from './purchase/new-vendor/new-vendor.component';
import { InvoiceNumberPipe } from '../../../@core/pipes/invoice-number.pipe';
import { EscapecharactersPipe } from '../../../@core/pipes/escapecharacters.pipe';
import { InvoiceTypePipe } from '../../../@core/pipes/invoice-type.pipe';
import { NanPipe } from '../../../@core/pipes/nan.pipe';
import { PaymentDatePipe } from '../../../@core/pipes/payment-date.pipe';
import { ViewBillOfSupplyComponent } from './sales/bill-of-supply/view-bill-of-supply/view-bill-of-supply.component';
import { ViewCreditComponent } from './sales/credit/view-credit/view-credit.component';
import { ViewDebitComponent } from './sales/debit/view-debit/view-debit.component';
import { ViewDeliveryChallanComponent } from './sales/delivery-challan/view-delivery-challan/view-delivery-challan.component';
import { ViewExportInvoiceComponent } from './sales/export-invoice/view-export-invoice/view-export-invoice.component';
import { ViewPaymentVoucherComponent } from './sales/payment-voucher/view-payment-voucher/view-payment-voucher.component';
import { ViewReceiptVoucherComponent } from './sales/receipt-voucher/view-receipt-voucher/view-receipt-voucher.component';
import { ViewRefundVoucherComponent } from './sales/refund-voucher/view-refund-voucher/view-refund-voucher.component';
import { ViewRetailInvoiceComponent } from './sales/retail-invoice/view-retail-invoice/view-retail-invoice.component';
import { ViewReviseInvoiceComponent } from './sales/revise-invoice/view-revise-invoice/view-revise-invoice.component';
import { ViewTaxInvoiceComponent } from './sales/tax-invoice/view-tax-invoice/view-tax-invoice.component';
import { ViewTradeDeliveryComponent } from './sales/trade-delivery/view-trade-delivery/view-trade-delivery.component';
import { ViewPurchaseInvoiceComponent } from './purchase/purchase-invoice/view-purchase-invoice/view-purchase-invoice.component';
import { FileUploadModule } from '../../../@theme/shared/file-upload/file-upload.module';
import { SalesOrderComponent } from './sales/sales-order/sales-order.component';
import { ViewSalesOrderComponent } from './sales/sales-order/view-sales-order/view-sales-order.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InvoiceRoutes),
        FormsModule,
        CalendarModule,
        CheckboxModule,
        AutoCompleteModule,
        MultiSelectModule,
        FileUploadModule
    ],
    declarations: [
        InvoiceNumberPipe,
        EscapecharactersPipe,
        SalesComponent,
        PurchaseComponent,
        TaxInvoiceComponent,
        SaveInvoiceComponent,
        InvoiceTypePipe,
        NanPipe,
        PaymentDatePipe,   
        RetailInvoiceComponent,   
        BillOfSupplyComponent, 
        ReceiptVoucherComponent, 
        RefundVoucherComponent,
        PaymentVoucherComponent,
        CreditComponent,
        DebitComponent,
        ReviseInvoiceComponent,
        DeliveryChallanComponent,
        TradeDeliveryComponent,
        PurchaseInvoiceComponent,
        ExportInvoiceComponent,
        InvoiceNumberSettingComponent,
        NewClientComponent,
        NewInventoryComponent,
        NewVendorComponent,
        ViewBillOfSupplyComponent,
        ViewCreditComponent,
        ViewDebitComponent,
        ViewDeliveryChallanComponent,
        ViewExportInvoiceComponent,
        ViewPaymentVoucherComponent,
        ViewReceiptVoucherComponent,
        ViewRefundVoucherComponent,
        ViewRetailInvoiceComponent,
        ViewReviseInvoiceComponent,
        ViewTaxInvoiceComponent,
        ViewTradeDeliveryComponent,
        ViewPurchaseInvoiceComponent,
        SalesOrderComponent,
        ViewSalesOrderComponent,
    ]
})

export class InvoiceModule { }
