import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';

declare var $:any;

@Component({
  selector: 'app-tax-invoice',
  templateUrl: './tax-invoice.component.html',
  styleUrls: ['./tax-invoice.component.css']
})
export class TaxInvoiceComponent extends createSalesInvoice implements OnInit {

  constructor(
    protected companyServiceService:CompanyServiceService
  ) {
    super(companyServiceService, 'TI');
    this.invoiceData['already_paid'] = '0';
  }

  ngOnInit() {
    
    this.invoiceData['bank_id'] = "1";

   $('[rel="tooltip"]').tooltip();
  }

  ngAfterViewInit(){   
    this.getTncandDeclaration();
    this.validate.validations();   
  }

  invoiceSubmit(isValid:boolean):void{

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
