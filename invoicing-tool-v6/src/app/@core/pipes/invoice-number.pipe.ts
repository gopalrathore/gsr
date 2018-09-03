import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceNumber'
})
export class InvoiceNumberPipe implements PipeTransform {

  transform(invoices: any, type: any): any {
    return invoices.filter(item=>{
      return item['invoice_type']===type;
    });
  }

}
