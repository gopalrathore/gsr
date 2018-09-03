import { createTable } from '../../createTable';
import { Router } from '@angular/router';
import { TransfereService } from '../../../../@core/services/transfer.service';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { Component } from "@angular/core";

declare var $:any;

@Component({
  selector: "app-journal-list",
  templateUrl: "./journal-list.component.html",
  styleUrls: ["./journal-list.component.css"]
})
export class JournalListComponent extends createTable{
  constructor(
    protected companyServiceService:CompanyServiceService,
    protected transfereService:TransfereService,
    protected router:Router) {
      super(companyServiceService, transfereService, router);
      this.dataTableSettings();
  }

  ngAfterViewInit(){  
    this.drawTable();
  }

  protected dataTableSettings():void{
    this.defineHeaders([ 'S.No', 'Date', 'Total amount', 'Action' ]);
    this.dataTableMessages = {
      searchPlaceholder: "Search Jounal",
      dataSafe: "Your journal is safe!",
      dataNotFound: "No Journal Added."
    };
    this.allAPIparams = {
      getTableData: "journals",
      deleteTableData: "journals",
      responseKeys :{
        primaryKey: "journal_id",
        nameKeyIndex: 1
      }
    };

    this.dataAttributes = {
      fields: ['journal_id','journal_date', 'journal_amount', 'status'],
      offset: 0,
      order: [{ORDER_BY:"status", ORDER_TYPE:"ASC"},{ORDER_BY:"inserted_ts", ORDER_TYPE:"DESC"}],
      limit: 1000
    };

    this.allRoutes ={
      viewRoute: "journal/view"
    };
  }

  tableDataManupulator(index:number, jsonData:string):string{
    let dbtn  = this.dataTableButtons;
    let dlbs  = this.dataTableLables;
    let data = JSON.parse(jsonData);
    
    let t =  [  index, 
                data['journal_date'],
                data['journal_amount'], 
                data['status']=='1'? dbtn.viewBtn:dlbs.disabled];
        return JSON.stringify(t);
    }
}
