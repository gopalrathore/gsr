import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../../reportTable';

@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.css']
})
export class StockAdjustmentComponent extends reportTable implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.report.report_name = "26_Bussiness_Reports_Stock_Adjustment_Report";
  }

}
