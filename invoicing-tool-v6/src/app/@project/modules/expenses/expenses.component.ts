import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { createTable } from '../createTable';
import { StringManipulation } from '../../../@core/utility-functions/utility-function';
import { CompanyServiceService } from '../../../@core/services/company-service.service';
import { TransfereService } from '../../../@core/services/transfer.service';

declare var $:any;
declare var swal:any;

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css']
  })

export class ExpensesComponent extends createTable {
  
  private nameMaker: StringManipulation = new StringManipulation();

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

    dataTableSettings(){
      this.defineHeaders([ '#', 'Type', 'Date', 'Invoice/Bill', 'Name', 'Amount', 'Payment Mode', 'ITC', 'Action' ]);
      this.dataTableMessages = {
        searchPlaceholder: "Search Expense",
        dataSafe: "Your expense is safe!",
        dataNotFound: "No Expense Added."
      };
      this.allAPIparams = {
        getTableData: "expense",
        deleteTableData: "expense",
        responseKeys :{
          primaryKey: "expense_id",
          nameKeyIndex: 1
        }
      };
      this.dataAttributes = {
        fields: ['expense_id','expense_type', 'expense_date', 'expense_invoice_number', 'expense_vendor_name', 'expense_amount', 'expense_payment_mode', 'expense_itc_eligibility', 'status'],
        offset: 0,
        order: [{ORDER_BY:"status", ORDER_TYPE:"ASC"},{ORDER_BY:"inserted_ts", ORDER_TYPE:"DESC"}],
        limit: 1000
      };
      this.allRoutes ={
        editRoute: "/expenses/edit-expenses"
      };
    }
    
    tableDataManupulator(index, jsonData){
      let dbtn  = this.dataTableButtons;
      let dlbs  = this.dataTableLables;
      let data = JSON.parse(jsonData);

        let t  = [index, 
                this.expenseType(data['expense_type']), 
                data['expense_date'],
                data['expense_invoice_number'],
                data['expense_vendor_name'],
                data['expense_amount'],  
                data['expense_payment_mode'], 
                data['expense_itc_eligibility']=='1'?'Yes':'No',
                data['status']=='1'? dbtn.editBtn+dbtn.deleteBtn:dlbs.disabled];
  
      return JSON.stringify(t);
    }

  expenseType(type){
    if(type == 'G')
      return "Goods";
    else if(type = 'S')
      return "Services";
    else
      return "";
  }

}
