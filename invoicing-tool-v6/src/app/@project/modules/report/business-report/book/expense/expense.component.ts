import { reportTable } from '../../../reportTable';
import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "18_Bussiness_Reports_Expense_Report";
  }


}
