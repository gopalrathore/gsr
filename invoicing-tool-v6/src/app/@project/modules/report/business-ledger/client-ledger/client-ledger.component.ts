import { AutoComplete } from '../../../../../@core/services/Autocomplete';
import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../reportTable';
declare var $:any;

@Component({
  selector: 'app-client-ledger',
  templateUrl: './client-ledger.component.html',
  styleUrls: ['./client-ledger.component.css']
})
export class ClientLedgerComponent extends reportTable implements OnInit {

  public client_name:string = "";
  public clientNameAutocomplete:AutoComplete = new AutoComplete();

  constructor() {
    super();
    this.clientNameAutocomplete.get_full_list("client","client_company_nickname","client_id");
   }

   clientSelected(){
    this.report.client_id = this.clientNameAutocomplete.getsearchListId(this.client_name);
   }

  ngOnInit() { 
    this.report.report_name = "01_Bussiness_Ledger_Client_Ledger";
  }
}
