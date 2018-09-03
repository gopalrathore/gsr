import { StatusCodes } from "../../../../../@core/dataset/status-code/codes";
import { AsyncApiCall } from "../../../../../@core/services/async-api-call";
import { Notification } from "../../../../../@core/utility-functions/utility-function";
import { createSalesInvoice } from "../../create-sales-invoice";
import { CompanyServiceService } from "../../../../../@core/services/company-service.service";

import { Component, OnInit } from "@angular/core";
declare var $: any;
@Component({
  selector: "app-revise-invoice",
  templateUrl: "./revise-invoice.component.html",
  styleUrls: ["./revise-invoice.component.css"]
})
export class ReviseInvoiceComponent extends createSalesInvoice
  implements OnInit {
  public invoices: any[] = [];
  constructor(public companyServiceService: CompanyServiceService) {
    super(companyServiceService, "REI");
    this.createInvoiceClient.clientNameAutocomplete.newAdd = false;
    this.invoiceData["already_paid"] = "0";

    AsyncApiCall.view("salesInvoice", {
      FIELDS: [
        "invoice_id",
        "invoice_number",
        "invoice_date",
        "client_id",
        "invoice_type",
        "status",
        "inserted_ts"
      ],
      ORDER: [
        { ORDER_BY: "status", ORDER_TYPE: "ASC" },
        { ORDER_BY: "inserted_ts", ORDER_TYPE: "DESC" }
      ]
    }).subscribe(resp => {
      console.log("here resp", resp);

      if (resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        this.invoices = resp.data;
      }
    });
  }

  ngOnInit() {
    this.invoiceData["bank_id"] = "1";
    $(".switch").bootstrapSwitch({
      onColor: "primary",
      onText: "Yes",
      offText: "No"
    });
    $('[rel="tooltip"]').tooltip();
  }

  updateDocDate(invoice: any): void {
    if (invoice == "") {
      this.invoiceData.org_doc_date = "";
      this.invoiceData.org_invoice_id = "";
    } else {
      this.invoiceData.org_doc_date = new Date(invoice.invoice_date);
      this.invoiceData.org_invoice_id = invoice.invoice_id;
    }
  }

  invoiceSubmit(isValid: boolean): void {
    if (isValid == true) {
      // this.getReverseCharge();
      if (this.invoiceData.already_paid == "1") {
        this.invoiceData.payment_due_days = 0;
      }
      super.invoiceSubmit(isValid);
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }

  ngAfterViewInit() {
    this.validate.validations();
  }
}
