import { createTable } from '../../createTable';
import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { Router } from '@angular/router';
import { TransfereService } from '../../../../@core/services/transfer.service';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-reciept-vouchers',
  templateUrl: './reciept-vouchers.component.html',
  styleUrls: ['./reciept-vouchers.component.css']
})

export class RecieptVouchersComponent extends createTable implements OnInit {

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected transfereService: TransfereService,
    protected router: Router
  ) {
    super(companyServiceService, transfereService, router);
    this.dataTableSettings();
  }

  dataTableSettings() {
    this.defineHeaders(['#', 'Client', 'Receiving date', 'TDS', 'Amount', 'Status', 'Action']);
    this.dataTableMessages = {
      searchPlaceholder: "Search voucher",
      dataSafe: "Your voucher is safe!",
      dataNotFound: "No Voucher Added."
    };
    this.allAPIparams = {
      getTableData: "receiptVoucher",
      deleteTableData: "receiptVoucher",
      responseKeys: {
        primaryKey: "receipt_voucher_id",
        nameKeyIndex: 1
      }
    };

    this.dataAttributes = {
      fields: ['receipt_voucher_id', 'client_id', 'client_company', 'receiving_date', 'tds_amount', 'amount', 'receipt_voucher_balance', 'status'],
      offset: 0,
      order: [{ "ORDER_BY": "status", "ORDER_TYPE": "ASC" }, { "ORDER_BY": "inserted_ts", "ORDER_TYPE": "DESC" }],
      limit: 1000
    };

    this.allRoutes = {
      editRoute: "/vouchers/receipt/transaction"
    };
  }

  tableDataManupulator(index, jsonData) {
    var data = JSON.parse(jsonData);
    var dbtn = this.dataTableButtons;
    var dlbs = this.dataTableLables;
    var t = [index,
      data['client_company'],
      data['receiving_date'],
      data['tds_amount'],
      data['amount'],
      data['receipt_voucher_balance'] == '0.00' ? '<span class="voucher-status balanced-voucher">balanced</span>' : '<span class="voucher-status immbalanced-voucher">Not Balanced</span> ',
      data['status'] == '1' ? dbtn.editBtn + dbtn.deleteBtn : dlbs.disabled];
    return JSON.stringify(t);
  }
  ngOnInit() { }

  ngAfterViewInit() {
    this.drawTable();
  }
}
