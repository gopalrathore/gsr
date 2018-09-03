import {
  HelperFunction,
  Notification,
  validations
} from "../../../../../@core/utility-functions/utility-function";
import { AsyncApiCall } from "../../../../../@core/services/async-api-call";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AutoComplete } from "../../../../../@core/services/Autocomplete";
import { TransfereService } from "../../../../../@core/services/transfer.service";
import { StatusCodes } from "../../../../../@core/dataset/dataset";

declare var $: any;

@Component({
  selector: "app-add-reciept-voucher",
  templateUrl: "./add-reciept-voucher.component.html",
  styleUrls: ["./add-reciept-voucher.component.css"]
})
export class AddRecieptVoucherComponent implements OnInit {
  public clientNameSelected: boolean;
  public putCallable: boolean = true;
  public receiptVoucherData: any = {
    client_first_name: "",
    client_id: null,
    transaction_detail_mode: "Cash",
    tds_amount: 0.0,
    receiving_date: new Date(),
    payment_date: new Date()
  };
  public totalAmount: number = this.receiptVoucherData.tds_amount;
  public voucherNumberAutomation: boolean = true;
  voucherNumberParam = {
    add: "receiptVoucherNumberFormat",
    view: "receiptVoucherNumberFormat"
  };
  public path:string = "";
  public uploadedFileLink:string = "";
  public clientNameAutocomplete: AutoComplete = new AutoComplete();
  protected validate = new validations(this.receiptVoucherData);
  constructor(
    private transfereService: TransfereService,
    private router: Router
  ) {
    this.clientNameAutocomplete.newAdd = true;
    this.clientNameAutocomplete.get_full_list(
      "client",
      "client_company_nickname",
      "client_id"
    );
  }

  ngOnInit() {
    this.getVoucherNumber();

    this.clientNameSelected = false;
    $(".datepicker").datetimepicker({
      format: "MM/DD/YYYY", //use this format if you want the 12hours timpiecker with AM/PM toggle
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-screenshot",
        clear: "fa fa-trash",
        close: "fa fa-remove"
      }
    });
  }
  ngAfterViewInit() {
    this.validate.validations();
  }
  clearVoucherNumber() {
    this.receiptVoucherData["receipt_voucher_number"] = "";
    this.voucherNumberAutomation = false;
  }

  public newClientAdded(newClient: any) {
    this.clientNameAutocomplete.get_full_list(
      "client",
      "client_company_nickname",
      "client_id"
    );
    console.log("new client id", newClient);
    this.receiptVoucherData.client_id = newClient.client_id;
    this.receiptVoucherData.client_first_name = newClient.client_name;
  }

  checkVoucherNumber() {
    let data = {
      receipt_voucher_number: this.receiptVoucherData.receipt_voucher_number
    };
    AsyncApiCall.post("receiptVoucherNumberFormat", data).subscribe(resp => {
      if (
        resp.statusCode != StatusCodes.codes.OK ||
        resp.data[0].receipt_voucher_status != "valid"
      ) {
        Notification.error(resp.message);
        this.receiptVoucherData.receipt_voucher_number = "";
      }
    });
  }

  getVoucherNumber(date = new Date()) {
    let data = {
      now_date: HelperFunction.getDate()
    };
    if (this.voucherNumberAutomation)
      AsyncApiCall.get("receiptVoucherNumberFormat", data).subscribe(resp => {
        if (
          resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION
        ) {
          this.receiptVoucherData["receipt_voucher_number"] =
            resp.data[0].receipt_voucher_number;
        }
      });
  }

  calTotal() {
    this.totalAmount =
      HelperFunction.toNumber(this.receiptVoucherData.tds_amount) +
      HelperFunction.toNumber(this.receiptVoucherData["receiving_amount"]);
  }

  formatChanged(format) {
    let data = {
      now_date: HelperFunction.getDate()
    };
    AsyncApiCall.get("receiptVoucherNumberFormat", data).subscribe(resp => {
      if (resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        this.receiptVoucherData["receipt_voucher_number"] =
          resp.data[0].receipt_voucher_number;
      }
    });
  }

  clientSelected() {
    if (this.receiptVoucherData.client_first_name == "+ Add New") {
      this.receiptVoucherData.client_first_name = "";
      // $(".newClient").click();
      $("#newClient").modal("show");
      return null;
    } else {
      this.receiptVoucherData.client_id = this.clientNameAutocomplete.getsearchListId(
        this.receiptVoucherData.client_first_name
      );
    }

    // this.receiptVoucherData.client_first_name = this.clientNameAutocomplete.getNameById(this.receiptVoucherData.client_id, 'client_id', 'client_name').client_company_nickname;
    // console.log("this.receiptVoucherData.client_id", this.receiptVoucherData.client_id);
  }

  receiptVoucherSubmit(isValid) {
    if (
      this.clientNameAutocomplete.getsearchListId(
        this.receiptVoucherData.client_first_name
      ) == false
    ) {
      Notification.error("Please select a valid client");
      return false;
    } else if (isValid && this.putCallable) {
      this.putCallable = false;
      if (this.receiptVoucherData.transaction_detail_mode != "Other") {
        delete this.receiptVoucherData["transaction_detail_mode_other"];
      }
      console.log(
        "this.receiptVoucherData",
        StatusCodes.codes.CREATED,
        this.receiptVoucherData
      );

      AsyncApiCall.put("receiptVoucher", this.receiptVoucherData).subscribe(
        resp => {
          this.putCallable = true;
          if (resp.statusCode == StatusCodes.codes.CREATED) {
            this.putCallable = true;
            let transfer_data = resp.data[0].receipt_voucher_id;
            this.transfereService.setData(transfer_data);
            this.router.navigateByUrl("/vouchers/receipt/transaction");
          } else {
            if (resp.message == "Invalid voucher number") {
              this.getVoucherNumber(this.receiptVoucherData.receiving_date);
              Notification.error("fix this");
            } else Notification.error(resp.message);
          }
        }
      );
    } else if (!this.putCallable) {
      console.warn("addReceiptVoucher: waiting for api response.");
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }

  public fileUploaded(fileUrl: string): void {
    console.log("URL received after upload", fileUrl);
    
  }
}
