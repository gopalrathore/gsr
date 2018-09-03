import { StatusCodes } from '../../../../../../@core/dataset/status-code/codes';
import { CompanyServiceService } from '../../../../../../@core/services/company-service.service';
import { Notification, HelperFunction } from '../../../../../../@core/utility-functions/utility-function';
import { AsyncApiCall } from '../../../../../../@core/services/async-api-call';

import { Component, OnInit } from '@angular/core';
import { NumberSetting } from '../payment-voucher-format/payment-voucher-format.component';

@Component({
  selector: 'app-sales-invoice-format',
  templateUrl: './sales-invoice-format.component.html',
  styleUrls: ['./sales-invoice-format.component.css']
})
export class SalesInvoiceFormatComponent implements OnInit {

  public invoiceNumberFormat:NumberSetting = {
    suffix: "",
    prefix: "",
    starting_number:"1",
    invoice_type: "0",
    starting_date: HelperFunction.getDate()
  }

  public putCallable:boolean = true;

  constructor(public companyServiceService:CompanyServiceService) { }

  ngOnInit() {
  }

  getInvoiceNumberFormat(){
    let dataToSend = {
      "invoice_type": this.invoiceNumberFormat.invoice_type,
      "FIELDS": ["prefix", "starting_number", "number_width", "suffix"],
      "LIMIT": 1,
      "OFFSET": 0,
      "ORDER": [{
      "ORDER_BY": "starting_date",
      "ORDER_TYPE": "DESC"}],
      now_date: HelperFunction.getDate()
    }
    if(this.invoiceNumberFormat.invoice_type!='0'){
      AsyncApiCall.view('salesInvoiceNumberFormat', dataToSend).subscribe(resp => {
        if(resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
          this.invoiceNumberFormat.suffix = resp.data[0].suffix;
          this.invoiceNumberFormat.prefix = resp.data[0].prefix;
          this.invoiceNumberFormat.starting_number = resp.data[0].starting_number;
        }
      });
    }
  }

  updateInvoiceNumberFormat(valid:boolean){
    if(valid && this.putCallable){
      this.putCallable = false;
      this.invoiceNumberFormat.starting_date = HelperFunction.getDate();
      AsyncApiCall.put('salesInvoiceNumberFormat', this.invoiceNumberFormat).subscribe(resp=>{
        this.putCallable = true;
        if(resp.statusCode === StatusCodes.codes.CREATED){
          Notification.success('Invoice Number format Changed.');
        }
      });
    }else if(!this.putCallable){
      console.warn("salesinvoicenumber: waiting for api response.");
    }else {
      Notification.error("Please fill all required Fields!");
    }
  }

}
