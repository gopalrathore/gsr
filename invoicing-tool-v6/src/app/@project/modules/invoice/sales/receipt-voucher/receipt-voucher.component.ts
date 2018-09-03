import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';

import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-receipt-voucher',
  templateUrl: './receipt-voucher.component.html',
  styleUrls: ['./receipt-voucher.component.css']
})
export class ReceiptVoucherComponent extends createSalesInvoice implements OnInit {

  constructor(public companyServiceService:CompanyServiceService) {
    super(companyServiceService, 'RV');
    this.invoiceData['already_paid'] = '0';
    
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
      if(this.invoiceData.already_paid=='1'){
        this.invoiceData.payment_due_days = '0';
      }
      super.invoiceSubmit(isValid);
    }else{
      Notification.error("Please fill all required Fields!");
    } 
  }

  
  ngAfterViewInit(){
    this.validate.validations();
  }
}
