import { Component } from '@angular/core';
import { reportTable } from '../../reportTable';

@Component({
  selector: 'app-cgst',
  templateUrl: './cgst.component.html',
  styleUrls: ['./cgst.component.css']
})
export class CgstComponent extends reportTable {

  constructor() {
    super();
   }

   ngAfterViewInit() {
    this.report.report_name = "05_Tax_Ledger_CGST_Ledger"
   }



}
