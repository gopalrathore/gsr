export class HeaderSection1 {
    constructor(private invoiceData:any){ }

    pdfHeader(){
        let pdfHeader:any[]= [[this.getInvoiceType(this.invoiceData['invoice_type']), this.invoiceData['invoice_date'], this.invoiceData['invoice_number']]];
        return pdfHeader;
    }

    private getInvoiceType(type:string){
        switch (type) {
            case 'RI':
              return "Retail Invoice";
            case 'TI':
              return "Tax Invoice";
            case 'EI':
              return "Export Invoice";
            case 'BOS':
              return "Bill of Supply";
            case 'RV':
                return "Receipt Voucher";
            case 'RFV':
                return "Refund Voucher";
            case 'PV':
                return "Payment Voucher";
            case 'REI':
                return "Revise Invoice";
            case 'TDC':
                return "Trade Delivery Challan";
            case 'CN':
                return "Credit Note";
            case 'DN':
                return "Debit Note";
            case 'DC':
                return "Delivery Challan";
            case 'ISD':
                return "ISD Invoice";
            case 'SO':
                return "Sales Order";
            default:
              return '';
          }
      }
}