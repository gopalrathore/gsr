import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../reportTable';

@Component({
  selector: 'app-gst-ledger',
  templateUrl: './gst-ledger.component.html',
  styleUrls: ['./gst-ledger.component.css']
})
export class GstLedgerComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "27_Tax_Reports_GST_report";
  }

}
