import { reportTable } from '../../../reportTable';
import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "20_Bussiness_Reports_Payment_Report";
  }



}
