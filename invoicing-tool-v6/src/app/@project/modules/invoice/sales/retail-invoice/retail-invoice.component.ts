import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';



declare var $:any;

@Component({
  selector: 'app-retail-invoice',
  templateUrl: './retail-invoice.component.html',
  styleUrls: ['./retail-invoice.component.css']
})
export class RetailInvoiceComponent extends createSalesInvoice implements OnInit {

  constructor(protected companyServiceService:CompanyServiceService) {
    super(companyServiceService, 'RI');
    // this.invoiceData['already_paid'] = '1';
    this.invoiceData['same_as_billing'] = 'false';
    this.invoiceData['client_shipping_country'] = 'India'
    this.invoiceData.transaction_detail_mode = 'Cash';
  }

  ngOnInit() {
    this.getTncandDeclaration();
    this.invoiceData['bank_id'] = "1";
    $('[rel="tooltip"]').tooltip();
    
  }

  invoiceSubmit(isValid:boolean):void{
    if(isValid==true){

      if(this.invoiceData.already_paid=='1'){
        this.invoiceData.payment_due_days = 0;
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
