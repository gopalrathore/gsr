import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../reportTable';
declare var $:any;

@Component({
  selector: 'app-creditor-ledger',
  templateUrl: './creditor-ledger.component.html',
  styleUrls: ['./creditor-ledger.component.css']
})
export class CreditorLedgerComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "03_Bussiness_Ledger_Creditors_Ledger";
  }



}
