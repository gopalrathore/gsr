import { SalesOrderComponent } from './sales/sales-order/sales-order.component';
import { ViewExportInvoiceComponent } from './sales/export-invoice/view-export-invoice/view-export-invoice.component';
import { ViewTradeDeliveryComponent } from './sales/trade-delivery/view-trade-delivery/view-trade-delivery.component';
import { ViewDeliveryChallanComponent } from './sales/delivery-challan/view-delivery-challan/view-delivery-challan.component';
import { ViewReviseInvoiceComponent } from './sales/revise-invoice/view-revise-invoice/view-revise-invoice.component';
import { ViewDebitComponent } from './sales/debit/view-debit/view-debit.component';
import { ViewCreditComponent } from './sales/credit/view-credit/view-credit.component';
import { ViewPaymentVoucherComponent } from './sales/payment-voucher/view-payment-voucher/view-payment-voucher.component';
import { ViewRefundVoucherComponent } from './sales/refund-voucher/view-refund-voucher/view-refund-voucher.component';
import { ViewReceiptVoucherComponent } from './sales/receipt-voucher/view-receipt-voucher/view-receipt-voucher.component';
import { ViewBillOfSupplyComponent } from './sales/bill-of-supply/view-bill-of-supply/view-bill-of-supply.component';
import { ViewRetailInvoiceComponent } from './sales/retail-invoice/view-retail-invoice/view-retail-invoice.component';
import { ViewTaxInvoiceComponent } from './sales/tax-invoice/view-tax-invoice/view-tax-invoice.component';
import { ExportInvoiceComponent } from './sales/export-invoice/export-invoice.component';
import { PurchaseInvoiceComponent } from './purchase/purchase-invoice/purchase-invoice.component';
import { TradeDeliveryComponent } from './sales/trade-delivery/trade-delivery.component';
import { DeliveryChallanComponent } from './sales/delivery-challan/delivery-challan.component';
import { ReviseInvoiceComponent } from './sales/revise-invoice/revise-invoice.component';
import { DebitComponent } from './sales/debit/debit.component';
import { CreditComponent } from './sales/credit/credit.component';
import { PaymentVoucherComponent } from './sales/payment-voucher/payment-voucher.component';
import { RefundVoucherComponent } from './sales/refund-voucher/refund-voucher.component';
import { ReceiptVoucherComponent } from './sales/receipt-voucher/receipt-voucher.component';
import { BillOfSupplyComponent } from './sales/bill-of-supply/bill-of-supply.component';
import { RetailInvoiceComponent } from './sales/retail-invoice/retail-invoice.component';
import { TaxInvoiceComponent } from './sales/tax-invoice/tax-invoice.component';
import { Routes } from '@angular/router';

import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AuthGuard } from '../../auth.guard';
import { ViewSalesOrderComponent } from './sales/sales-order/view-sales-order/view-sales-order.component';


export const InvoiceRoutes: Routes = [{
  path: '',
  redirectTo: 'sales',
  pathMatch: 'full'
}, {
  path: '',
  children: [{
    path: 'sales',
    component: SalesComponent,
    data: {
      title: "List Sales Invoice",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/tax-invoice',
    component: TaxInvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Tax Invoice",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-tax-invoice',
    component: ViewTaxInvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Tax Invoice",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/retail-invoice',
    component: RetailInvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Retail Invoice",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-retail-invoice',
    component: ViewRetailInvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Retail Invoice",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/bill-of-supply',
    component: BillOfSupplyComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Bill of Supply",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-bill-of-supply',
    component: ViewBillOfSupplyComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Bill of Supply",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/sales-order',
    component: SalesOrderComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Sales Order",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-sales-order',
    component: ViewSalesOrderComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Sales Order",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/receipt-voucher',
    component: ReceiptVoucherComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Receipt Voucher",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-receipt-voucher',
    component: ViewReceiptVoucherComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Receipt Voucher",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/refund-voucher',
    component: RefundVoucherComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Refund Voucher",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-refund-voucher',
    component: ViewRefundVoucherComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Refund Voucher",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/payment-voucher',
    component: PaymentVoucherComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Payment Voucher",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view payment-voucher',
    component: ViewPaymentVoucherComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Payment Voucher",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/credit-note',
    component: CreditComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Credit Note",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-credit-note',
    component: ViewCreditComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Credit Note",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/debit-note',
    component: DebitComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Debit Note",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-debit-note',
    component: ViewDebitComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Debit Note",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/revise-invoice',
    component: ReviseInvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Revise Invoice",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-revise-invoice',
    component: ViewReviseInvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Revise Invoice",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/delivery-challan',
    component: DeliveryChallanComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Delivery Challan",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-delivery-challan',
    component: ViewDeliveryChallanComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Delivery Challan",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/trade-delivery-challan',
    component: TradeDeliveryComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Trade Delivery Challan",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-trade-delivery-challan',
    component: ViewTradeDeliveryComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Trade Delivery Challan",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/export-invoice',
    component: ExportInvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Export Invoice",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'sales/view-export-invoice',
    component: ViewExportInvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      title: "View Export Invoice",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'purchase',
    component: PurchaseComponent,
    canActivate: [AuthGuard],
    data: {
      title: "List Purchase Invoice",
      metaDescription: "meta desc"
    }
  },
  {
    path: 'purchase/purchase-invoice',
    component: PurchaseInvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Purchase Invoice",
      metaDescription: "meta desc"
    }
  }]
}];
