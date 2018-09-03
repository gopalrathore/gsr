declare interface SingleReport {
  reportName: string;
  reportDisplayName: string;
  link: string;
  permission: boolean;
  status: number;
}
declare interface BusinessLedger {
  clientLedger: SingleReport;
  vendorLedger: SingleReport;
  creditorsLedger: SingleReport;
  debtorsLedger: SingleReport;
}
declare interface TaxLedger {
  cgstLedger: SingleReport;
  sgstLedger: SingleReport;
  igstLedger: SingleReport;
  cessLedger: SingleReport;
  tdsLedger: SingleReport;
}
declare interface BusinessReports {
  bankCashBook: SingleReport;
  bankBook: SingleReport;
  cashBook: SingleReport;
  expenseReport: SingleReport;
  goodsAndServiceReport: SingleReport;
  paymentReport: SingleReport;
  purchaseRegisterItemwise: SingleReport;
  purchaseRegisterinvoicewise: SingleReport;
  receiptReports: SingleReport;
  salesRegisterItemwise: SingleReport;
  salesRegisterInvoicewise: SingleReport;
  stockAdjustmentReport: SingleReport;
}
declare interface TaxReports {
  gstLedgerReport: SingleReport;
}
declare interface Report {
  businessLedger: BusinessLedger;
  taxReports: TaxReports;
  taxLedger: TaxLedger;
  businessReports: BusinessReports;
}

export const report: Report = {
  taxReports: {
    gstLedgerReport: {
      reportName: "GST Ledger Report",
      reportDisplayName: "GST Ledger Report",
      link: "./../tax-report/gst-ledger-report",
      permission: true,
      status: 1
    }
  },
  businessLedger: {
    clientLedger: {
      reportName: "Client Ledger",
      reportDisplayName: "Client Ledger",
      link: "./../business-ledger/client-ledger",
      permission: true,
      status: 1
    },
    vendorLedger: {
      reportName: "Vendor Ledger",
      reportDisplayName: "Vendor Ledger",
      link: "./../business-ledger/vendor-ledger",
      permission: true,
      status: 1
    },
    creditorsLedger: {
      reportName: "Creditors Ledger",
      reportDisplayName: "Creditors Ledger",
      link: "./../business-ledger/creditor-ledger",
      permission: true,
      status: 1
    },
    debtorsLedger: {
      reportName: "Debtors Ledger",
      reportDisplayName: "Debtors Ledger",
      link: "./../business-ledger/debitor-ledger",
      permission: true,
      status: 1
    }
  },
  taxLedger: {
    cgstLedger: {
      reportName: "CGST Ledger",
      reportDisplayName: "CGST Ledger",
      link: "./../tax-ledger/cgst",
      permission: true,
      status: 1
    },
    igstLedger: {
      reportName: "IGST Ledger",
      reportDisplayName: "IGST Ledger",
      link: "./../tax-ledger/igst",
      permission: true,
      status: 1
    },
    sgstLedger: {
      reportName: "SGST Ledger",
      reportDisplayName: "SGST Ledger",
      link: "./../tax-ledger/sgst",
      permission: true,
      status: 1
    },
    cessLedger: {
      reportName: "CESS Ledger",
      reportDisplayName: "CESS Ledger",
      link: "./../tax-ledger/cess",
      permission: true,
      status: 1
    },
    tdsLedger: {
      reportName: "TDS Ledger",
      reportDisplayName: "TDS Ledger",
      link: "./../tax-ledger/tds",
      permission: true,
      status: 1
    }
  },
  businessReports: {
    bankCashBook: {
      reportName: "Bank & Cash Book",
      reportDisplayName: "Bank & Cash Book",
      link: "./../business-report/book/bank-cash-book",
      permission: true,
      status: 1
    },
    bankBook: {
      reportName: "Bank Book",
      reportDisplayName: "Bank Book",
      link: "./../business-report/book/bank-book",
      permission: true,
      status: 1
    },
    cashBook: {
      reportName: "Cash Book",
      reportDisplayName: "Cash Book",
      link: "./../business-report/book/cash-book",
      permission: true,
      status: 1
    },
    expenseReport: {
      reportName: "Expense Report",
      reportDisplayName: "Expense Report",
      link: "./../business-report/book/expense",
      permission: true,
      status: 1
    },
    goodsAndServiceReport: {
      reportName: "Goods & Service",
      reportDisplayName: "Goods & Service",
      link: "./../business-report/book/goods-service",
      permission: true,
      status: 1
    },
    purchaseRegisterItemwise: {
      reportName: "Purchase Register Itemwise",
      reportDisplayName: "Purchase Register Itemwise",
      link: "./../business-report/book/purchase-register-item-wise",
      permission: true,
      status: 1
    },
    paymentReport: {
      reportName: "Payment Report",
      reportDisplayName: "Payment Report",
      link: "./../business-report/book/payment-report",
      permission: true,
      status: 1
    },
    purchaseRegisterinvoicewise: {
      reportName: "Purchase Register Invoicewise",
      reportDisplayName: "Purchase Register Invoicewise",
      link: "./../business-report/book/purchase-register-invoice-wise",
      permission: true,
      status: 1
    },
    receiptReports: {
      reportName: "Receipt Report",
      reportDisplayName: "Receipt Report",
      link: "./../business-report/book/receipt-report",
      permission: true,
      status: 1
    },
    salesRegisterItemwise: {
      reportName: "Sales Register Itemwise",
      reportDisplayName: "Sales Register Itemwise",
      link: "./../business-report/register/sales-report-item",
      permission: true,
      status: 1
    },
    salesRegisterInvoicewise: {
      reportName: "Sales Register Invoicewise",
      reportDisplayName: "Sales Register Invoicewise",
      link: "./../business-report/register/sales-report-invoice",
      permission: true,
      status: 1
    },
    stockAdjustmentReport: {
      reportName: "GSTPayablereport",
      reportDisplayName: "Stock Adjustment Report",
      link: "./../business-report/book/stock-adjustment",
      permission: true,
      status: 1
    }
  }
};

export const canRoute = {
  "/report/tax-ledger/cgst":
    report.taxLedger.cgstLedger.permission,
  "/report/tax-ledger/igst":
    report.taxLedger.igstLedger.permission,
  "/report/tax-ledger/sgst":
    report.taxLedger.sgstLedger.permission,
  "/report/tax-ledger/cess":
    report.taxLedger.cessLedger.permission,
  "/report/tax-ledger/tds":
    report.taxLedger.tdsLedger.permission,

  "/report/business-report/book/bank-book":
    report.businessReports.bankBook.permission,
  "/report/business-report/book/cash-book":
    report.businessReports.cashBook.permission,
  "/report/business-report/register/sales-report-item":
    report.businessReports.salesRegisterItemwise.permission,
  "/report/business-report/register/sales-report-invoice":
    report.businessReports.salesRegisterInvoicewise.permission,

  "/report/business-ledger/client-ledger":
    report.businessLedger.clientLedger.permission,
  "/report/business-ledger/vendor-ledger":
    report.businessLedger.vendorLedger.permission,
  "/report/business-ledger/creditor-ledger":
    report.businessLedger.creditorsLedger.permission,
  "/report/business-ledger/debitor-ledger":
    report.businessLedger.debtorsLedger.permission
};
