import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';

declare var $:any;

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css']
})
export class SalesOrderComponent extends createSalesInvoice implements OnInit {

  constructor(
    protected companyServiceService:CompanyServiceService
  ) {
    super(companyServiceService, 'SO');
    this.invoiceData['already_paid'] = '0';
  }

  ngOnInit() {
    
    this.invoiceData['bank_id'] = "1";
    
   $('.switch').bootstrapSwitch({
    onColor:'primary',
    onText: 'Yes',
    offText: 'No'
   });

   $('[rel="tooltip"]').tooltip();
  }

  ngAfterViewInit(){   
    this.getTncandDeclaration();
    this.validate.validations();   
  }

  invoiceSubmit(isValid:boolean):void{
    // if(this.createInvoiceClient.client_gsttreatment === 'SEZ'){
    //   Notification.error('SEZ client can not make this invoice.');
    //   return false;
    // }

    if(isValid==true){
      if(this.invoiceData.already_paid=='1'){
        this.invoiceData.payment_due_days = '0';
      }
      super.invoiceSubmit(isValid);
    }else{
      Notification.error('Please fill all required Fields!');
    }
  }

}
