import { CompanyServiceService } from '../../../@core/services/company-service.service';
import { TransfereService } from '../../../@core/services/transfer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { createTable } from '../createTable';




declare var swal: any;
declare var $: any;

@Component({
  // moduleId: module.id,
  selector: 'bank-cmp',
  templateUrl: 'bank.component.html'
})

export class BankComponent extends createTable implements OnInit {

  private accountTypes: object = {
    C: 'Current',
    S: 'Saving',
    OD: 'Over Draft',
    CC: 'Cash Credit',
    NER: 'NER',
    CCD: 'Credit Card',
    L: 'Loan'
  }

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected transfereService: TransfereService,
    protected router: Router) {
    super(companyServiceService, transfereService, router);
    this.dataTableSettings();
  }

  ngOnInit() { }

  dataTableSettings() {
    this.defineHeaders(['S.No', 'Bank Name', 'Account Type', 'IFSC', 'Action']);
    this.dataTableMessages = {
      searchPlaceholder: "Search Banks",
      dataSafe: "Your Bank is safe!",
      dataNotFound: "No Bank Added."
    };
    this.allAPIparams = {
      getTableData: "bank",
      deleteTableData: "bank",
      responseKeys: {
        primaryKey: "bank_id",
        nameKeyIndex: 1
      }
    };

    this.dataAttributes = {
      fields: ['bank_id', 'bank_name', 'account_type', 'ifsc', 'status'],
      offset: 0,
      order: [{ ORDER_BY: "status", ORDER_TYPE: "ASC" }, { ORDER_BY: "inserted_ts", ORDER_TYPE: "DESC" }],
      limit: 1000
    };

    this.allRoutes = {
      editRoute: "/bank/edit-bank"
    };
  }

  tableDataManupulator(index, jsonData): string {
    let data = JSON.parse(jsonData);
    let dbtn = this.dataTableButtons;
    let dlbs = this.dataTableLables;
    let t = [index,
      data['bank_name'],
      this.accountType(data['account_type']),
      data['ifsc'].toUpperCase(),
      data['status'] === '1' ? dbtn.editBtn + dbtn.deleteBtn : dlbs.disabled];
    return JSON.stringify(t);
  }

  private accountType(type: string) {
    if (type === null || type === undefined) return "UNKNOWN";
    else if (this.accountTypes[type]) return this.accountTypes[type];
    else return type;
  }


  ngAfterViewInit() {
    this.drawTable();
  }
}
