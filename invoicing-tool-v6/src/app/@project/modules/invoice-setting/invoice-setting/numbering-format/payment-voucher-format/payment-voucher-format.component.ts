import { HelperFunction, Notification } from '../../../../../../@core/utility-functions/utility-function';
import { AsyncApiCall } from '../../../../../../@core/services/async-api-call';
import { Component, OnInit } from '@angular/core';
import { StatusCodes } from '../../../../../../@core/dataset/dataset';

export interface NumberSetting {
  suffix: string;
  prefix: string;
  starting_number:string;
  invoice_type?: string;
  starting_date: string;
}

@Component({
  selector: 'app-payment-voucher-format',
  templateUrl: './payment-voucher-format.component.html',
  styleUrls: ['./payment-voucher-format.component.css']
})
export class PaymentVoucherFormatComponent implements OnInit {

  public paymentVoucherNumberFormat:NumberSetting = {
    suffix: "",
    prefix: "",
    starting_number:"1",
    starting_date: ""
  }
  
  public putCallable:boolean = true;

  constructor() { }

  ngOnInit() {
    this.getPaymentNumberFormat();
  }

  getPaymentNumberFormat(){
    let dataToSend = {
      "FIELDS": ["prefix", "starting_number", "number_width", "suffix"],
      "LIMIT": 1,
      "OFFSET": 0,
      "ORDER": [{
      "ORDER_BY": "starting_date",
      "ORDER_TYPE": "DESC"}],
      now_date: HelperFunction.getDate()
    }
    AsyncApiCall.view('paymentVoucherNumberFormat', dataToSend).subscribe(resp => {
      if(resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
        this.paymentVoucherNumberFormat.suffix = resp.data[0].suffix;
        this.paymentVoucherNumberFormat.prefix = resp.data[0].prefix;
        this.paymentVoucherNumberFormat.starting_number = resp.data[0].starting_number;
      }
    });
  }

  updatePaymentNumberFormat(valid){
    if(valid && this.putCallable){
      this.putCallable = false;
      this.paymentVoucherNumberFormat.starting_date = HelperFunction.getDate();
      AsyncApiCall.put('paymentVoucherNumberFormat', this.paymentVoucherNumberFormat).subscribe(resp=>{
        this.putCallable = true;
        if(resp.statusCode === StatusCodes.codes.CREATED){
          Notification.success('Invoice Number format Changed.');
        }
      });
    }else if(!this.putCallable){
      console.warn("paymentVoucherformat: waiting for api response.");
    }else {
      Notification.error("Please fill all required Fields!")
    }
  }

}
