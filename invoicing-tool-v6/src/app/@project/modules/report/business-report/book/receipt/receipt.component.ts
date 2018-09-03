import { reportTable } from '../../../reportTable';
import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "23_Bussiness_Reports_Receipt_Reports";
  }


}
