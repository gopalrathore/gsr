import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../../reportTable';
declare var $:any;
@Component({
  selector: 'app-sales-report-invoice',
  templateUrl: './sales-report-invoice.component.html',
  styleUrls: ['./sales-report-invoice.component.css']
})
export class SalesReportInvoiceComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "25_Bussiness_Reports_Sales_Register_Invoicewise";
  }

}
