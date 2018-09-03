import { HelperFunction, validations } from '../../../../@core/utility-functions/utility-function';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { StatusCodes } from '../../../../@core/dataset/dataset';

declare var $:any;

declare interface NumberSetting {
  suffix: string;
  prefix: string;
  starting_number:string;
}

@Component({
  selector: 'app-voucher-number-setting',
  templateUrl: './voucher-number-setting.component.html',
  styleUrls: ['./voucher-number-setting.component.css']
})
export class VoucherNumberSettingComponent{

  @Output() formatChanged = new EventEmitter();
  @Input() voucherNumberParam: any = {
    add: '',
    view: ''
  };
  numberSetting:NumberSetting = {
    suffix: "",
    prefix: "",
    starting_number: ""
  };

  protected validate = new validations(this.numberSetting,this.constructor.name);

  constructor(private companyServiceService:CompanyServiceService) { }


  ngAfterViewInit(){
    this.getSetting();
    this.validate.validations();

  }

  saveNumberFormat(){
    AsyncApiCall.put(this.voucherNumberParam.add, this.numberSetting).subscribe(resp=>{      
      if(resp.statusCode==StatusCodes.codes.CREATED){
        this.formatChanged.emit("formate changed");
        $('#voucherNumber').modal('hide');
      }
    });
  }

  getSetting(){
    AsyncApiCall.view(this.voucherNumberParam.view, {
      "FIELDS": ["prefix", "starting_number", "number_width", "suffix", "starting_date"],
      "LIMIT": 1,
      "OFFSET": 0,
      "ORDER": [{
      "ORDER_BY": "starting_date",
      "ORDER_TYPE": "DESC"}],
      "now_date": HelperFunction.getDate()
    }).subscribe(resp=>{
      if(resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
        resp.data[0].prefix = resp.data[0].prefix==null?"":resp.data[0].prefix;
        resp.data[0].suffix = resp.data[0].suffix==null?"":resp.data[0].suffix;
        this.numberSetting = resp.data[0];
        this.validate.changerefrence(this.numberSetting);
        this.numberSetting["starting_date"] = new Date();
      }
    });
  }

}
