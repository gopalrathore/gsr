import { Component } from '@angular/core';
import { reportTable } from '../../reportTable';

@Component({
  selector: 'app-tds',
  templateUrl: './tds.component.html',
  styleUrls: ['./tds.component.css']
})
export class TdsComponent extends reportTable {

  constructor() {
    super();
   }

   ngAfterViewInit() {
    this.report.report_name = "13_Tax_Ledger_TDS_Ledger";
   }

}
