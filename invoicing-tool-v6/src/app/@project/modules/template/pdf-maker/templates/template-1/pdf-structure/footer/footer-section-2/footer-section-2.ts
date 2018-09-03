import { HelperFunction } from './../../../../../../../../../@core/utility-functions/functions/helper-function';
export class FooterSection2 {
    constructor(private invoiceData: any) { }

    getInvoiceTotal() {
      
        let invoiceTotal : any[] = [];
        invoiceTotal.push([{ text: 'Taxable Total', style: 'invoiceContentTitle' }, `: ${(this.invoiceData['invoice_taxable_total'])}`]);
        
        // if(Number(this.invoiceData['extra_charges'])!==0)
          invoiceTotal.push([{ text: 'Total Extra Charges', style: 'invoiceContentTitle' }, `: ${(this.invoiceData['extra_charges'])}`]);
        // if(Number(this.invoiceData['tax_on_extra_charges'])!==0)
          invoiceTotal.push([ { text: 'Tax On Extra Charges', style: 'invoiceContentTitle' }, `: ${this.invoiceData['tax_on_extra_charges']}`]);


        invoiceTotal.push([{ text: 'Total Invoice Value (In Figure)', style: 'invoiceContentTitle' }, `: ${this.invoiceData['invoice_total']}`]);
        invoiceTotal.push([{ text: 'Total Invoice Value (In Words)', style: 'invoiceContentTitle' }, `: ${HelperFunction.totalInWords(this.invoiceData['invoice_total'])}`]);

          console.log("invoiceTotal",invoiceTotal);
          
        return invoiceTotal;
    }
}