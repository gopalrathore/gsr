import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransfereService } from "../../../../../@core/services/transfer.service";
import { AutoComplete } from "../../../../../@core/services/Autocomplete";
import {
  validations,
  HelperFunction,
  Notification
} from "../../../../../@core/utility-functions/utility-function";
import { StatusCodes } from "../../../../../@core/dataset/dataset";
import { AsyncApiCall } from "../../../../../@core/services/async-api-call";

declare var $: any;

declare interface PaymentVoucherData {
  vendor_first_name: string;
  vendor_id: string;
  transaction_detail_mode: string;
  tds_amount: number;
  receiving_date: Date;
  payment_date: Date;
  payment_voucher_number: string;
  remark: string;
  transaction_detail_id: string;
  receiving_amount: number;
}

@Component({
  selector: "app-add-payment-voucher",
  templateUrl: "./add-payment-voucher.component.html",
  styleUrls: ["./add-payment-voucher.component.css"]
})
export class AddPaymentVoucherComponent implements OnInit {
  public vendorNameSelected: boolean;
  public paymentVoucherData: PaymentVoucherData = {
    vendor_first_name: "",
    vendor_id: null,
    transaction_detail_mode: "Cash",
    tds_amount: 0.0,
    receiving_date: new Date(),
    payment_date: new Date(),
    payment_voucher_number: "",
    remark: "",
    transaction_detail_id: "",
    receiving_amount: null
  };
  public totalAmount: number = this.paymentVoucherData.tds_amount;
  public voucherNumberAutomation: boolean = true;
  public voucherNumberParam: object = {
    add: "paymentVoucherNumberFormat",
    view: "paymentVoucherNumberFormat"
  };
  public vendorNameAutocomplete: AutoComplete = new AutoComplete();
  protected validate: validations = new validations(this.paymentVoucherData);
  public putCallable: boolean = true;
  public path: string = "";
  public uploadedFileLink:string = "";

  constructor(
    private transfereService: TransfereService,
    private router: Router
  ) {}

  ngOnInit() {
    this.vendorNameSelected = false;
    this.getVoucherNumber();
    $('[rel="tooltip"]').tooltip();
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
    this.vendorNameAutocomplete.get_full_list(
      "vendor",
      "vendor_company_nickname",
      "vendor_id"
    );
    this.vendorNameAutocomplete.newAdd = true;
    this.validate.validations();
  }

  calTotal() {
    this.totalAmount =
      HelperFunction.toNumber(this.paymentVoucherData.tds_amount) +
      HelperFunction.toNumber(this.paymentVoucherData["receiving_amount"]);
  }

  public newVendorAdded(newVendor: any) {
    console.log("new vendor", newVendor);

    this.vendorNameAutocomplete.get_full_list(
      "vendor",
      "vendor_company_nickname",
      "vendor_id"
    );
    this.paymentVoucherData.vendor_id = newVendor.vendor_id;
    this.paymentVoucherData.vendor_first_name = newVendor.vendor_name;
  }

  vendorSelected() {
    if (this.paymentVoucherData.vendor_first_name == "+ Add New") {
      console.log("yes");

      this.paymentVoucherData.vendor_first_name = "";
      // $(".newClient").click();
      $("#newVendor").modal("show");
      return null;
    } else {
      this.paymentVoucherData.vendor_id = this.vendorNameAutocomplete.getsearchListId(
        this.paymentVoucherData.vendor_first_name
      );
    }
  }

  clearVoucherNumber() {
    this.paymentVoucherData["payment_voucher_number"] = "";
    this.voucherNumberAutomation = false;
  }

  checkVoucherNumber() {
    let data = {
      payment_voucher_number: this.paymentVoucherData.payment_voucher_number
    };
    AsyncApiCall.post("paymentVoucherNumberFormat", data).subscribe(resp => {
      if (
        resp.statusCode != StatusCodes.codes.OK ||
        resp.data[0].payment_voucher_status != "valid"
      ) {
        Notification.error(resp.message);
        this.paymentVoucherData.payment_voucher_number = "";
      }
    });
  }

  getVoucherNumber(date = new Date()) {
    let data = {
      now_date: HelperFunction.getDate()
    };
    if (this.voucherNumberAutomation)
      AsyncApiCall.get("paymentVoucherNumberFormat", data).subscribe(resp => {
        if (
          resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION
        ) {
          this.paymentVoucherData["payment_voucher_number"] =
            resp.data[0].payment_voucher_number;
        }
      });
  }

  formatChanged(format) {
    let data = {
      now_date: HelperFunction.getDate()
    };
    AsyncApiCall.get("paymentVoucherNumberFormat", data).subscribe(resp => {
      if (resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        this.paymentVoucherData["payment_voucher_number"] =
          resp.data[0].payment_voucher_number;
      }
    });
  }

  paymentVoucherSubmit(isValid) {
    if (
      this.vendorNameAutocomplete.getsearchListId(
        this.paymentVoucherData.vendor_first_name
      ) == false
    ) {
      Notification.error("Please select a valid vendor");
      return false;
    } else if (isValid && this.putCallable) {
      this.putCallable = false;

      if (this.paymentVoucherData.transaction_detail_mode != "Other") {
        delete this.paymentVoucherData["transaction_detail_mode_other"];
      }
      AsyncApiCall.put("paymentVoucher", this.paymentVoucherData).subscribe(
        resp => {
          this.putCallable = true;
          if (resp.statusCode == StatusCodes.codes.CREATED) {
            let transfer_data = resp.data[0].payment_voucher_id;
            this.transfereService.setData(transfer_data);
            this.router.navigateByUrl("/vouchers/payment/transaction");
          } else {
            if (resp.message == "Invalid voucher number") {
              this.getVoucherNumber(this.paymentVoucherData.receiving_date);
              Notification.error("New invoice number generated");
            } else Notification.error(resp.message);
          }
        }
      );
    } else {
      console.warn("addPaymentVoucher: waiting for api response.");
    }
  }

  public fileUploaded(path: string): void {}
}
