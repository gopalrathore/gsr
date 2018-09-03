import { reportTable } from '../../../reportTable';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-bank-cash-book',
  templateUrl: './bank-cash-book.component.html',
  styleUrls: ['./bank-cash-book.component.css']
})
export class BankCashBookComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() { 
    this.report.report_name = "15_Bussiness_Reports_Bank_Cash_Book";
  }




}
