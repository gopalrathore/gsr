import { StatusCodes } from '../../../../../@core/dataset/status-code/codes';
import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';
import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css']
})
export class DebitComponent extends createSalesInvoice implements OnInit {

  public invoices:any[] = [];

  constructor(public companyServiceService:CompanyServiceService) {
    super(companyServiceService, 'DN');
    this.invoiceData['org_invoice_type'] = '';
    this.invoiceData['org_doc_number'] = '';
    
    
    AsyncApiCall.view('salesInvoice', {
      "FIELDS":["invoice_id", "invoice_number", "invoice_date", "client_id", "invoice_type", "status", "inserted_ts", "reverse_charge", "sales_person", "sales_order_number", "payment_due_days", "client_shipping_state_name", "client_shipping_state_code", "client_shipping_country", "client_shipping_address_4", "client_shipping_address_3", "client_shipping_address_2", "client_shipping_address"],
      "ORDER":[{ORDER_BY:"status", ORDER_TYPE:"ASC"},{ORDER_BY:"inserted_ts", ORDER_TYPE:"DESC"}]
    }).subscribe(resp=>{
      if(resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
        this.invoices = resp.data;
      }
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
    console.log("invoice", invoice);

    this.invoiceData.reverse_charge = invoice.reverse_charge;
    this.invoiceData.sales_person = invoice.sales_person;
    this.invoiceData.sales_order_number = invoice.sales_order_number;
    this.invoiceData.payment_due_days = invoice.payment_due_days;
    this.invoiceData.client_shipping_state_name = invoice.client_shipping_state_name;
    this.invoiceData.client_shipping_state_code = invoice.client_shipping_state_code;
    this.invoiceData.client_shipping_country = invoice.client_shipping_country;
    this.invoiceData.client_shipping_address_4 = invoice.client_shipping_address_4;
    this.invoiceData.client_shipping_address_3 = invoice.client_shipping_address_3;
    this.invoiceData.client_shipping_address_2 = invoice.client_shipping_address_2;
    this.invoiceData.client_shipping_address = invoice.client_shipping_address;
    
    this.invoiceData.org_doc_date = new Date(invoice.invoice_date);
    this.invoiceData.org_invoice_id = invoice.invoice_id;
    this.clientSelected(invoice.client_id);
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
