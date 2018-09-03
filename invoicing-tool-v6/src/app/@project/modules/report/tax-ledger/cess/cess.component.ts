import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../reportTable';

@Component({
  selector: 'app-cess',
  templateUrl: './cess.component.html',
  styleUrls: ['./cess.component.css']
})
export class CessComponent extends reportTable {

  constructor() {
    super();
   }

   ngAfterViewInit() {
    this.report.report_name = "08_Tax_Ledger_CESS_Ledger"
  }




}
