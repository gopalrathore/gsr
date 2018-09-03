import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { CompanyServiceService } from "../../../../@core/services/company-service.service";
import { TransfereService } from "../../../../@core/services/transfer.service";

import { createTable } from "../../createTable";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.css"]
})
export class ClientComponent extends createTable {

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected transfereService: TransfereService,
    protected router: Router
  ) {
    super(companyServiceService, transfereService, router);
    this.dataTableSettings();
  }

  ngAfterViewInit() {
    this.drawTable();
  }

  /**
   * @description Prepare datatable columns and rows
   * @returns void
   */
  protected dataTableSettings(): void {
    this.defineHeaders([
      "S.No",
      "Client Name",
      "Email",
      "Mobile",
      "Status",
      "Action"
    ]);
    this.dataTableMessages = {
      searchPlaceholder: "Search Client",
      dataSafe: "Your client is safe!",
      dataNotFound: "Please add a client."
    };
    this.allAPIparams = {
      getTableData: "client",
      deleteTableData: "client",
      responseKeys: {
        primaryKey: "client_id",
        nameKeyIndex: 1
      }
    };

    this.dataAttributes = {
      fields: [
        "client_id",
        "client_company",
        "client_email",
        "client_mobile",
        "client_registered",
        "status"
      ],
      offset: 0,
      order: [{ORDER_BY:"status", ORDER_TYPE:"ASC"},{ORDER_BY:"inserted_ts", ORDER_TYPE:"DESC"}],
      limit: 1000
    };

    this.allRoutes = {
      editRoute: "business-parties/clients/edit-client"
    };
  }

  /**
   * @description add rows with action buttons and data
   * @override 
   * @param index index of the row to be manipulated
   * @param jsonData data to be added on the row
   */
  tableDataManupulator(index: number, jsonData: string): string {
    let dbtn = this.dataTableButtons;
    let dlbs = this.dataTableLables;
    let data: object = JSON.parse(jsonData);

    let singleRowData: string[] = [
      index,
      data["client_company"],
      data["client_email"],
      data["client_mobile"],
      data["client_registered"] === "1" ? dlbs.registered : dlbs.unregistered,
      data["status"] === "1" ? dbtn.editBtn + dbtn.deleteBtn : dlbs.disabled
    ];
    return JSON.stringify(singleRowData);
  }
}
