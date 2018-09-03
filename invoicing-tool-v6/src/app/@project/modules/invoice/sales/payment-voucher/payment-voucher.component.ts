import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-payment-voucher',
  templateUrl: './payment-voucher.component.html',
  styleUrls: ['./payment-voucher.component.css']
})
export class PaymentVoucherComponent extends createSalesInvoice implements OnInit {

  constructor(public companyServiceService:CompanyServiceService) {
    super(companyServiceService, 'PV');
    
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
