import { Component } from '@angular/core';
import { reportTable } from '../../reportTable';

@Component({
  selector: 'app-igst',
  templateUrl: './igst.component.html',
  styleUrls: ['./igst.component.css']
})
export class IgstComponent extends reportTable {

  constructor() {
    super();
   }

   ngAfterViewInit() { 
    this.report.report_name = "06_Tax_Ledger_IGST_Ledger"
  }


}
