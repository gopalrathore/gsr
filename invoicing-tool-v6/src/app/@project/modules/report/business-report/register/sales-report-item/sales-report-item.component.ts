import { reportTable } from "../../../reportTable";
import { Component, OnInit } from "@angular/core";
declare var $: any;

@Component({
  selector: "app-sales-report-item",
  templateUrl: "./sales-report-item.component.html",
  styleUrls: ["./sales-report-item.component.css"]
})
export class SalesReportItemComponent extends reportTable implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    this.report.report_name = "24_Bussiness_Reports_Sales_Register_Itemwise";
  }
}
