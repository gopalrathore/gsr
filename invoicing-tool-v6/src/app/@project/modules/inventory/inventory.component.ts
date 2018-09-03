import { CompanyServiceService } from '../../../@core/services/company-service.service';
import { TransfereService } from '../../../@core/services/transfer.service';
import { createTable } from '../createTable';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;
declare var swal:any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
    // moduleId: module.id,
    selector: 'inventory-cmp',
    templateUrl: './inventory.component.html'
})

export class InventoryComponent extends createTable{


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
    this.defineHeaders([ 'S.No', 'HSN/SAC', 'Name', 'Description', 'Rate', 'Tax Rate', 'Type', 'Stock Status', 'Action' ]);
    this.dataTableMessages = {
      searchPlaceholder: "Search Inventory",
      dataSafe: "Your inventory is safe!",
      dataNotFound: "No Item Added."
    };
    this.allAPIparams = {
      getTableData: "inventory",
      deleteTableData: "inventory",
      responseKeys :{
        primaryKey: "item_id",
        nameKeyIndex: 1
      }
    };

    this.dataAttributes = {
      fields: ['item_id','item_hsn_code', 'item_name', 'item_desc', 'item_selling_rate', 'item_tax_rate_intrastate', 'item_type', 'item_id', 'in_stock_status', 'item_unit_primary_display', 'status'],
      offset: 0,
      order: [{ORDER_BY:"status", ORDER_TYPE:"ASC"},{ORDER_BY:"inserted_ts", ORDER_TYPE:"DESC"}],
      limit: 1000
    };

    this.allRoutes ={
      editRoute: "inventory/edit"
    };
  }

  tableDataManupulator(index:number, jsonData:string):string{
    let dbtn  = this.dataTableButtons;
    let dlbs  = this.dataTableLables;
    let data = JSON.parse(jsonData);

    let stockOutput = '';

    if(data['in_stock_status']<=0){
      stockOutput = '<span class="intentory-status btn-danger"> '+data['in_stock_status']+' '+data['item_unit_primary_display']+'</span>';
    }else if(data['in_stock_status']<data['item_stock_reorderpoint'] && data['in_stock_status']>0){
      stockOutput = '<span class="intentory-status btn-warning"> '+data['in_stock_status']+' '+data['item_unit_primary_display']+'</span>';
    }else {
      stockOutput = '<span class="intentory-status btn-success"> '+data['in_stock_status']+' '+data['item_unit_primary_display']+'</span>';
    }
    
    let t =  [  index, 
                data['item_hsn_code'],
                data['item_name'],
                (data['item_desc']!=null && data['item_desc'].length>20)? (data['item_desc'].slice(0,20))+'..':(data['item_desc']),
                Number(data['item_selling_rate']).toFixed(2),
                data['item_tax_rate_intrastate'],  
                this.gettype(data['item_type']), 
                data['item_type']==='G'?stockOutput:'-',
                data['status']==='1'? dbtn.editBtn+dbtn.deleteBtn:dlbs.disabled];
        return JSON.stringify(t);
    }

    protected gettype(t:string):string{
    return t==='G'? "Goods":"Services";
  }

}
