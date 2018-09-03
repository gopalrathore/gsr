import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';

import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-trade-delivery',
  templateUrl: './trade-delivery.component.html',
  styleUrls: ['./trade-delivery.component.css']
})
export class TradeDeliveryComponent extends createSalesInvoice implements OnInit {

  
  constructor(public companyServiceService:CompanyServiceService) {
    super(companyServiceService, 'TDC');
    this.invoiceData['already_paid'] = '0';
  }

  ngOnInit() {

    this.invoiceData['bank_id'] = "1";
   
   $('[rel="tooltip"]').tooltip();
  }
  

  invoiceSubmit(isValid:boolean):void{
    if(isValid==true){
      super.invoiceSubmit(isValid);
    }else{
      Notification.error("Please fill all required Fields!");
    }
  }

  ngAfterViewInit(){
    this.getTncandDeclaration();
    this.validate.validations();
  }
}


