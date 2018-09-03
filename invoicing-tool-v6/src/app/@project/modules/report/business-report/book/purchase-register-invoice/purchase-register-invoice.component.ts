import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../../reportTable';
declare var $:any;

@Component({
  selector: 'app-purchase-register-invoice',
  templateUrl: './purchase-register-invoice.component.html',
  styleUrls: ['./purchase-register-invoice.component.css']
})
export class PurchaseRegisterInvoiceComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "22_Bussiness_Reports_Purchase_Register_invoicewise";
  }


}
