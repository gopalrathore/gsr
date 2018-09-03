import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceType'
})
export class InvoiceTypePipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
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
          
    }
  }

}
