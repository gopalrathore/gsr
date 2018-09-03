import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../../reportTable';
declare var $:any;

@Component({
  selector: 'app-cash-book',
  templateUrl: './cash-book.component.html',
  styleUrls: ['./cash-book.component.css']
})
export class CashBookComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "17_Bussiness_Reports_Cash_Book";
  }


}
