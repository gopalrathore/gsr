import { AutoComplete } from '../../../../../@core/services/Autocomplete';
import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../reportTable';
declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-vendor-ledger',
  templateUrl: './vendor-ledger.component.html',
  styleUrls: ['./vendor-ledger.component.css']
})
export class VendorLedgerComponent extends reportTable implements OnInit {

  public vendor_name: string;
  public vendorNameAutocomplete:AutoComplete = new AutoComplete();

  constructor() {
    super();
    this.vendorNameAutocomplete.get_full_list("vendor","vendor_company_nickname","vendor_id");
   }

  ngOnInit() {
    this.report.report_name = "02_Bussiness_Ledger_Vendor_Ledger";
  }

  vendorSelected(){
    this.report.vendor_id = this.vendorNameAutocomplete.getsearchListId(this.vendor_name);
  }
}
