import { StringManipulation, Notification, validations, HelperFunction } from "../../../@core/utility-functions/utility-function";
import { StatusCodes } from "../../../@core/dataset/status-code/codes";
import { AsyncApiCall } from "../../../@core/services/async-api-call";

import { Router } from "@angular/router";

import { CompanyServiceService } from "../../../@core/services/company-service.service";
import { ExpenseType } from "../../../@core/dataset/dataset";
import { AutoComplete } from "../../../@core/services/Autocomplete";

declare var $: any;
declare var swal: any;

export class expenseUtility {

  expense: any = {
    expense_gst_treatment: 'Regular',
    expense_discount: '0',
    expense_itc_eligibility: 1,
    expense_type: "G",
    expense_reverse_charge: false,
    expense_tax_inclusion: false,
    expense_date: new Date(),
    expense_destination_of_supply: "",
    expense_tax: "0.00",
    expense_invoice_date: new Date()
  };

  public path: string = "";
  public uploadedFileLink: string = "";

  public putCallable: boolean = true;
  public patchCallable: boolean = true;
  public clientNameAutocomplete: AutoComplete = new AutoComplete();
  public vendorNameAutocomplete: AutoComplete = new AutoComplete();
  public employeeName: AutoComplete = new AutoComplete();

  public expenseType: string[] = new ExpenseType().getExpenseType(['Other']);

  protected validate = new validations(this.expense);

  constructor(protected api: CompanyServiceService, protected router: Router) {
    this.clientNameAutocomplete.get_full_list("client", "client_company_nickname", "client_id");
    this.vendorNameAutocomplete.get_full_list("vendor", "vendor_company_nickname", "vendor_id", { vendor_registered: 1 });
    this.employeeName.get_full_list("employee", "employee_first_name", "employee_id");
    this.vendorNameAutocomplete.newAdd = false;
    this.clientNameAutocomplete.newAdd = true;
  }

  newClientAdded(client) {
    this.clientSelected(client);
    this.expense.expense_client_name = client.client_name;
    this.clientNameAutocomplete.get_full_list("client", "client_company_nickname", "client_id");
  }

  clientSelected(client?: any) {
    if (this.expense.expense_client_name == "+ Add New") {

      this.expense.expense_client_name = "";
      $('#newClient').modal('show');
      return null;
    }
    else {
      this.expense[
        "expense_client_id"
      ] = client ? client.client_id : this.clientNameAutocomplete.getsearchListId(
        this.expense.expense_client_name
      );
    }
  }

  public fileUploaded(path: string): void { }

  getExpenseData(expenseId: any) {
    AsyncApiCall.get("expense", { expense_id: expenseId }).subscribe(resp => {
      if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        let output;
        this.expense = resp.data[0];
        if (typeof this.expense.expense_invoice_note === "string") {
          output = StringManipulation.decodeHtml(
            StringManipulation.escapeHtml(this.expense.expense_invoice_note)
          );
          this.expense.expense_invoice_note = output;
        }

        this.expense.expense_reverse_charge =
          this.expense.expense_reverse_charge == 1 ? true : false;
        this.expense.expense_tax_inclusion =
          this.expense.expense_tax_inclusion == "inclusive" ? true : false;
        this.expense["expense_date"] = new Date(resp.data[0]["expense_date"]);
        this.expense["expense_invoice_date"] = this.expense[
          "expense_invoice_date"
        ]
          ? new Date(resp.data[0]["expense_invoice_date"])
          : resp.data[0]["expense_invoice_date"];
      } else {
        Notification.error("Something went wrong. Try again.");
      }
    });
  }

  itcEligibilityChanged() {
    this.expense.expense_vendor_gst_id = '';
    this.expense.expense_gst_treatment = this.expense.expense_itc_eligibility === '1' ? 'Regular' : this.expense.expense_gst_treatment;
    if (this.expense.expense_itc_eligibility === '1') {
      this.expense.expense_vendor_name = "";
      this.expense.expense_vendor_gst_id = "";
      this.expense.expense_vendor_id = "";
    }

  }

  expenseSubmit(isValid) {
    let expense_temp = JSON.parse(JSON.stringify(this.expense));

    expense_temp.expense_invoice_date = HelperFunction.getDate(this.expense.expense_invoice_date);
    expense_temp.expense_date = HelperFunction.getDate(this.expense.expense_date);
    if (isValid && this.putCallable) {
      this.putCallable = false;

      expense_temp.expense_reverse_charge = expense_temp.expense_reverse_charge ? 1 : 0;
      expense_temp.expense_tax_inclusion = expense_temp.expense_tax_inclusion ? "inclusive" : "exclusive";

      AsyncApiCall.put("expense", expense_temp).subscribe(resp => {
        this.putCallable = true;
        if (resp.statusCode == StatusCodes.codes.CREATED) {
          this.showAlert();
        } else {
          Notification.error("Something went wrong, try again");
        }
      });
    } else if (!this.putCallable) {
      console.warn("addExpense: waiting for api response.");
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }

  newVendorAdded(vendor: any) {
    this.vendorNameAutocomplete.get_full_list("vendor", "vendor_company_nickname", "vendor_id");
    this.vendorSelected(vendor);
  }

  vendorSelected(vendor?: any) {
    if (this.expense.expense_vendor_name == "+ Add New") {

      this.expense.expense_vendor_name = "";
      $('#newVendor').modal('show');
      return null;
    }
    else {
      let vendor_id = vendor ? vendor.vendor_id : this.vendorNameAutocomplete.getsearchListId(
        this.expense.expense_vendor_name
      );
      let data = {
        vendor_id: vendor_id
      };



      AsyncApiCall.get('vendor', data)
        .subscribe(resp => {
          if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
            console.log("vendor", resp);

            this.expense.expense_vendor_name = resp.data[0]["vendor_company"];
            this.expense.expense_vendor_gst_id = resp.data[0]["vendor_gst_id"];
            this.expense.expense_vendor_id = resp.data[0]["vendor_id"];
          } else {
            console.log("vendor was not selected");
          }
        });
    }
  }

  showAlert() {
    let that = this;
    swal({
      title: "Success",
      text: "Expense has been edited successfully.",
      type: "success",
      showCancelButton: false,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "Proceed",
      buttonsStyling: false
    }).then(function () {
      that.router.navigateByUrl("expenses");
    });
  }
}
