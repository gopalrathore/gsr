import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../../reportTable';
declare var $:any;

@Component({
  selector: 'app-bank-book',
  templateUrl: './bank-book.component.html',
  styleUrls: ['./bank-book.component.css']
})
export class BankBookComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() { 
    this.report.report_name = "16_Bussiness_Reports_Bank_Book";
  }

}
