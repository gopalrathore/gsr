import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { TransfereService } from '../../../../@core/services/transfer.service';

import { createTable } from '../../createTable';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})

export class VendorComponent extends createTable implements OnInit {

  constructor(
    protected companyServiceService:CompanyServiceService,
    protected transfereService:TransfereService,
    protected router:Router) {
      super(companyServiceService, transfereService, router);
      this.dataTableSettings();
  }

  ngOnInit(){}
  
  ngAfterViewInit(){  
    this.drawTable(); 
  }

  /**
   * @description Prepare datatable columns and rows
   * @returns void
   */
  protected dataTableSettings():void{
      this.defineHeaders(['S.No', 'Vendor Name', 'Email', 'Mobile', 'Status', 'Action']);
      this.dataTableMessages = {
        searchPlaceholder: "Search Vendor",
        dataSafe: "Your vendor is safe!",
        dataNotFound: "No Vendor Added."
      };
      this.allAPIparams = {
        getTableData: "vendor",
        deleteTableData: "vendor",
        responseKeys :{
          primaryKey: "vendor_id",
          nameKeyIndex: 1
        }
      };

      this.dataAttributes = {
        fields: ['vendor_id','vendor_company', 'vendor_email', 'vendor_mobile', 'vendor_registered', 'status'],
        offset: 0,
        order: [{ORDER_BY:"status", ORDER_TYPE:"ASC"},{ORDER_BY:"inserted_ts", ORDER_TYPE:"DESC"}],
        limit: 1000
      };
      this.allRoutes ={
        editRoute: "business-parties/vendors/edit-vendor"
      };
    }

    /**
     * @description add rows with action buttons and data
     * @param index index of the row to be manipulated
     * @param jsonData data to be added on the row
     */
    tableDataManupulator(index:number, jsonData:string):string{
      let dbtn  = this.dataTableButtons;
      let dlbs  = this.dataTableLables;
      let data = JSON.parse(jsonData);

      let t =  [  index, 
        data['vendor_company'],
        data['vendor_email'],  
        data['vendor_mobile'],
                  data['vendor_registered']==='1'?dlbs.registered:dlbs.unregistered,
                  data['status']==='1'? dbtn.editBtn+dbtn.deleteBtn:dlbs.disabled];
                  
      return JSON.stringify(t);
  }
}
