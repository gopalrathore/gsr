import { Notification, HelperFunction } from '../../../../../../@core/utility-functions/utility-function';
import { AsyncApiCall } from '../../../../../../@core/services/async-api-call';

import { Component, OnInit } from '@angular/core';
import { NumberSetting } from '../payment-voucher-format/payment-voucher-format.component';
import { StatusCodes } from '../../../../../../@core/dataset/dataset';

@Component({
  selector: 'app-receipt-voucher-format',
  templateUrl: './receipt-voucher-format.component.html',
  styleUrls: ['./receipt-voucher-format.component.css']
})
export class ReceiptVoucherFormatComponent implements OnInit {

  public receiptVoucherNumberFormat:NumberSetting = {
    suffix: "",
    prefix: "",
    starting_number:"1",
    starting_date: ""
  }

  public putCallable:boolean = true;

  constructor() { }

  ngOnInit() {
    this.getReceiptNumberFormat();
  }

  getReceiptNumberFormat(){
    let dataToSend = {
      "FIELDS": ["prefix", "starting_number", "number_width", "suffix"],
      "LIMIT": 1,
      "OFFSET": 0,
      "ORDER": [{
      "ORDER_BY": "starting_date",
      "ORDER_TYPE": "DESC"}],
      now_date: HelperFunction.getDate()
    }
    console.log("datatosend",dataToSend);
    
    AsyncApiCall.view('receiptVoucherNumberFormat', dataToSend).subscribe(resp => {
      if(resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
        this.receiptVoucherNumberFormat.suffix = resp.data[0].suffix;
        this.receiptVoucherNumberFormat.prefix = resp.data[0].prefix;
        this.receiptVoucherNumberFormat.starting_number = resp.data[0].starting_number;
      }
    });
  }

  updateReceiptNumberFormat(valid){
    if(valid && this.putCallable){
      this.putCallable = false;
      this.receiptVoucherNumberFormat.starting_date = HelperFunction.getDate();
      AsyncApiCall.put('receiptVoucherNumberFormat', this.receiptVoucherNumberFormat).subscribe(resp=>{
        this.putCallable = true;
        if(resp.statusCode === StatusCodes.codes.CREATED){ 
          Notification.success('Invoice Number format Changed.');
        }
      });
    }else if(!this.putCallable){
      console.warn("receiptvouchernummber: waiting for api response.");
    }else {
      Notification.error("Please fill all required Fields!");
    }
  }

}
