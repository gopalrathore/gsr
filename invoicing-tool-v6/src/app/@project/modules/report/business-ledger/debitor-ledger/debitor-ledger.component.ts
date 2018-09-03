import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../reportTable';
declare var $:any;

@Component({
  selector: 'app-debitor-ledger',
  templateUrl: './debitor-ledger.component.html',
  styleUrls: ['./debitor-ledger.component.css']
})
export class DebitorLedgerComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "04_Bussiness_Ledger_Debtors_Ledger";
  }




}
