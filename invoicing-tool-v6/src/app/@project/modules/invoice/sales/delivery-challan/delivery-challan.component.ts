import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-delivery-challan',
  templateUrl: './delivery-challan.component.html',
  styleUrls: ['./delivery-challan.component.css']
})
export class DeliveryChallanComponent extends createSalesInvoice implements OnInit {

  constructor(public companyServiceService:CompanyServiceService) {
    super(companyServiceService, 'DC');
    
  }

  ngOnInit() {
    this.getTncandDeclaration();
    this.invoiceData['bank_id'] = "1";
   $('.switch').bootstrapSwitch({
    onColor:'primary',
    onText: 'Yes',
    offText: 'No'
   });
   $('[rel="tooltip"]').tooltip();
  }

  invoiceSubmit(isValid:boolean):void{ 
    if(isValid==true){
      // this.getReverseCharge();
      super.invoiceSubmit(isValid);
    }else{
      Notification.error("Please fill all required Fields!");
    }
  }
  
  ngAfterViewInit(){
    this.validate.validations();
  }
} 
