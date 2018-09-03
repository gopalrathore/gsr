import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';

import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-refund-voucher',
  templateUrl: './refund-voucher.component.html',
  styleUrls: ['./refund-voucher.component.css']
})
export class RefundVoucherComponent extends createSalesInvoice implements OnInit {

  public invoices:any[] = [];

  constructor(public companyServiceService:CompanyServiceService) {
    super(companyServiceService, 'RFV');
    AsyncApiCall.view('salesInvoice', {
      "FIELDS":["invoice_id", "invoice_number", "invoice_type", "invoice_date"]
    }).subscribe(resp=>{
      this.invoices = resp.data;
    });
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

  updateDocDate(invoice:any):void{
    this.invoiceData.org_doc_date = new Date(invoice.invoice_date);
    this.invoiceData.org_invoice_id = invoice.invoice_id;
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
