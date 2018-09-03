import { StatusCodes } from '../../../../../@core/dataset/status-code/codes';
import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.css']
})
export class CustomFieldsComponent implements OnInit {

  public putCallable:boolean = true;

  constructor(public companyServiceService:CompanyServiceService) {
    this.companyServiceService.allPrefences.sync();
   }

  ngOnInit() { }

  addMoreItem(){
    let newItem = {
      label: "",
      value: ""
    }
    if(this.companyServiceService.allPrefences.myPrefrences.myInvoicePrefrence.customFieldPrefrence.editablecustomFields.length<10)
    this.companyServiceService.allPrefences.myPrefrences.myInvoicePrefrence.customFieldPrefrence.editablecustomFields.push(newItem);
  }

  removeItem(i){
    if(this.companyServiceService.allPrefences.myPrefrences.myInvoicePrefrence.customFieldPrefrence.editablecustomFields.length>1)
    this.companyServiceService.allPrefences.myPrefrences.myInvoicePrefrence.customFieldPrefrence.editablecustomFields.splice(i,1);
  }

  saveCustomFields(){
    if(this.putCallable){
      this.putCallable = false;
      let custom_fields =  this.companyServiceService.allPrefences.myPrefrences.myInvoicePrefrence.customFieldPrefrence.validateCustomFieldsStructure(this.companyServiceService.allPrefences.myPrefrences.myInvoicePrefrence.customFieldPrefrence.editablecustomFields); 
    AsyncApiCall.patch('prefrences',{custom_fields:JSON.stringify(custom_fields)}).subscribe(resp=>{
      this.putCallable = true;
      if(resp.statusCode === StatusCodes.codes.ACCEPTED){
        Notification.success('Custom Fields Updated!');
        this.companyServiceService.allPrefences.myPrefrences.myInvoicePrefrence.customFieldPrefrence.setCustomFields(JSON.stringify(custom_fields));
      }
    });
    }else {
      console.warn("customFileds: waiting for api response.");
    }
    
  }

}
