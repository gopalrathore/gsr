import { Component } from '@angular/core';
import { reportTable } from '../../reportTable';
declare var $:any;

@Component({
  selector: 'app-sgst',
  templateUrl: './sgst.component.html',
  styleUrls: ['./sgst.component.css']
})
export class SgstComponent extends reportTable {

  constructor() {
    super();
   }

   ngAfterViewInit() {
    this.report.report_name = "07_Tax_Ledger_SGST_Ledger"
   }


}
