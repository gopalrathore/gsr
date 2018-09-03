
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { createTable, DataTableButtons, DataTableLables } from '../../createTable';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { TransfereService } from '../../../../@core/services/transfer.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-import-history',
  templateUrl: './import-history.component.html',
  styleUrls: ['./import-history.component.css']
})

export class ImportHistoryComponent extends createTable implements OnInit {

  public data: any = {
    branch_name: ''
  }

  constructor(protected companyServiceService: CompanyServiceService, protected transfereService: TransfereService, protected router: Router) {
    super(companyServiceService, transfereService, router);
    this.data = this.transfereService.getData();
    this.dataTableSettings();
    if (this.data === undefined) {
      this.router.navigate(['dashboard']);
    }

  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.drawTable(this.data);
  }

  dataTableSettings() {
    this.defineHeaders(['Sr No.', 'Uploaded On', 'File Name', 'Action']);
    this.dataTableMessages = {
      searchPlaceholder: "Search History",
      dataSafe: "",
      dataNotFound: "No File Added."
    };
    this.allAPIparams = {
      getTableData: "branch_history",
      deleteTableData: "",
      responseKeys: {
        primaryKey: "file_id",
        nameKeyIndex: 1
      }
    };

    

    this.dataAttributes = {
      fields: ['file_id', 'uploaded_file_name', 'insert_date', 'status'],
      offset: 0,
      order: [{ ORDER_BY: "status", ORDER_TYPE: "ASC" }, { ORDER_BY: "insert_date", ORDER_TYPE: "DESC" }],
      limit: 1000
    };

    this.allRoutes = {
      editRoute: "/import/all-e-way-bills"
    };
  }

  tableDataManupulator(index: number, jsonData: string): string {
    let dlbs: DataTableLables = this.dataTableLables;
    let data: any = JSON.parse(jsonData);
    let link: string = "https://s3.amazonaws.com/eway-bill-bulk-software/v.02/bulkEwayBillUploadExcels/"+data['uploaded_file_name']+".xlsx";
    let filename: string = data['uploaded_file_name'];
    let date: Date = new Date(data['insert_date']);

    let tempRow: any = [index,
      date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
      data['uploaded_file_name'],
      data['status'] === '1' ? '<a class="btn btn-success btn-fill" href=' + link + ' download=' + filename + '>Download</a> <a class="btn btn-warning btn-fill import-history">Generate JSON</a>' : dlbs.disabled];
    return JSON.stringify(tempRow);
  }

}
