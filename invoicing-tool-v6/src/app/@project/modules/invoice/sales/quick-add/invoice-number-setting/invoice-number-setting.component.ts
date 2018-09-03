import { StatusCodes } from '../../../../../../@core/dataset/dataset';
import { HelperFunction, Notification, validations } from '../../../../../../@core/utility-functions/utility-function';
import { AsyncApiCall } from '../../../../../../@core/services/async-api-call';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NumberSetting } from '../../@salesInvoiceCreationController/@interfaces/number-setting';


declare var $:any;



@Component({
  selector: 'app-invoice-number-setting',
  templateUrl: './invoice-number-setting.component.html',
  styleUrls: ['./invoice-number-setting.component.css']
})
export class InvoiceNumberSettingComponent implements OnInit {

  @Output() formatChanged = new EventEmitter();
  @Input() invoiceType: string;
  public numberSetting:NumberSetting = {
    suffix: "",
    prefix: "",
    starting_number:"1",
    invoice_type: "",
    starting_date: ""
  };

  public putCallable: boolean = true;

  protected validate = new validations(this.numberSetting,this.constructor.name);

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.getSetting();
    this.validate.validations();
  }

  changeInvoiceNumberFormat(isValid:boolean):void{
    if(isValid && this.putCallable){
      this.putCallable = false;
      this.numberSetting.invoice_type = this.invoiceType;
      this.numberSetting.starting_date = HelperFunction.getDate();
      AsyncApiCall.put("salesInvoiceNumberFormat",this.numberSetting).subscribe(resp=>{
        this.putCallable = true; 
        if(resp.statusCode==StatusCodes.codes.CREATED){
          this.formatChanged.emit("formate changed");
          $('#invoice-number-setting').modal('hide');
        }else {
          Notification.error(resp.message);
        }
      });
    }else if(!this.putCallable) {
      console.log("invoice number setting : ", "Waiting for API response.");
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }

  getSetting():void{
    AsyncApiCall.view('salesInvoiceNumberFormat', {
      invoice_type: this.invoiceType,
      "FIELDS": ["prefix", "starting_number", "number_width", "suffix"],
      "LIMIT": 1,
      "OFFSET": 0,
      "ORDER": [{
      "ORDER_BY": "starting_date",
      "ORDER_TYPE": "DESC"}]
    })
    .subscribe(resp=>{      
      if(resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
        resp.data[0].prefix = resp.data[0].prefix==null?"":resp.data[0].prefix;
        resp.data[0].suffix = resp.data[0].suffix==null?"":resp.data[0].suffix;
        this.numberSetting = resp.data[0];
        this.validate.changerefrence(this.numberSetting);
        this.numberSetting["invoice_type"] =  this.invoiceType;
        this.numberSetting['starting_date'] = HelperFunction.getDate();
      }
    });
  }
 
}
