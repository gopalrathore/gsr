import { HelperFunction, Notification } from '../../../../../../@core/utility-functions/utility-function';

import { AsyncApiCall } from '../../../../../../@core/services/async-api-call';
import { StatusCodes } from '../../../../../../@core/dataset/dataset';
import { InvoiceData } from '../@interfaces/invoiceData';

export class CreateInvoiceInvoiceNumber {

  public invoiceNumberAutomation:boolean = true;


  constructor(private invoiceData:InvoiceData){     
    this.getInvoiceNumber()
  }

  public getInvoiceNumber():void {
      let data:any = {
        invoice_type: this.invoiceData.invoice_type,
        invoice_date: HelperFunction.getDate(this.invoiceData.invoice_date)
      };
      
      if (this.invoiceNumberAutomation)
      AsyncApiCall.get('salesInvoiceNumberFormat', data)
      .subscribe(resp => {        
        if (resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
          this.invoiceData.invoice_number = resp.data[0].invoice_number;
        }
      });    
  }

  public checkInvoiceNumber():void {
    let data:any = {
      invoice_date: this.invoiceData.invoice_date,
      invoice_type: this.invoiceData.invoice_type,
      invoice_number: this.invoiceData.invoice_number
    };

    AsyncApiCall.post('salesInvoiceNumberFormat', data)
      .subscribe(resp => {
        if(resp.statusCode==StatusCodes.codes.I_AM_USED || resp.statusCode == StatusCodes.codes.NOT_ACCEPTABLE){
          Notification.error("Invalid Invoice Number");
          this.invoiceData.invoice_number = '';
        }else if(resp.statusCode !== StatusCodes.codes.OK){
          Notification.error("Something went wrong!");
        }
      });
  }

  protected clearInvoiceNumber():void {
    this.invoiceData["invoice_number"] = "";
    this.invoiceNumberAutomation = false;
  }
}