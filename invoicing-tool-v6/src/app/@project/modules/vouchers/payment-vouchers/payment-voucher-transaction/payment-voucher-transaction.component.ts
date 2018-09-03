import { StatusCodes } from "../../../../../@core/dataset/status-code/codes";
import { AsyncApiCall } from "../../../../../@core/services/async-api-call";
import { Notification } from "../../../../../@core/utility-functions/utility-function";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransfereService } from "../../../../../@core/services/transfer.service";
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
declare interface VoucherData {
  insert_date: string;
  payment_voucher_amount: number;
  payment_amount_adjusted: number;
  payment_voucher_balance: number;
}
declare var $: any;
declare var swal: any;

@Component({
  selector: "app-payment-voucher-transaction",
  templateUrl: "./payment-voucher-transaction.component.html",
  styleUrls: ["./payment-voucher-transaction.component.css"]
})
export class PaymentVoucherTransactionComponent implements OnInit {
  public tableData;
  public putCallable:boolean = true;
  public voucherData: VoucherData = {
    insert_date: new Date().toDateString(),
    payment_voucher_amount: 0,
    payment_amount_adjusted: 0,
    payment_voucher_balance: 0
  };
  transfer_data = this.transfereService.getData();
  payment_voucher_id: any;
  vendor_id:any = null;
  inputAmt = [];
  constructor(
    private transfereService: TransfereService,
    private router: Router
  ) {

    console.log("transfer_data", this.transfer_data);
    
    if (this.transfer_data) {
      this.payment_voucher_id = this.transfer_data;
      this.getVoucherDetails();
    } else {
      this.router.navigateByUrl("/vouchers/payment");
    }
  }

  ngOnInit() {}

  getCurrentTransaction() {
    AsyncApiCall.get("purchaseInvoiceBalance", {
      vendor_id: this.vendor_id
    }).subscribe(resp => {
      console.log("current txn detail", resp);
      this.tableData = resp.data;
    });
  }

  getVoucherDetails() {
    AsyncApiCall.get("paymentVoucherBalance", {
      payment_voucher_id: this.payment_voucher_id
    }).subscribe(resp => {
      if (resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        this.voucherData = resp.data[0];
        this.vendor_id = resp.data[0].vendor_id;
        this.getCurrentTransaction();
      }
    });
  }

  addTransaction(purchase_id, amount) {
    if(this.putCallable){
      this.putCallable = false;
      let txnData = {
        payment_voucher_id: this.payment_voucher_id,
        purchase_id: purchase_id,
        transaction_amount: amount
      };
  
      AsyncApiCall.put("paymentVoucherTransaction", txnData).subscribe(resp => {
        this.putCallable = true;
        if (resp.statusCode == StatusCodes.codes.CREATED) {
          Notification.success("Transaction has been recorded successfully.");
          this.getCurrentTransaction();
          this.getVoucherDetails();
        } else {
          Notification.error("Something went wrong!");
        }
      });
    }else {
      console.warn("paymentVoucherTxn: waiting for api reponse.");      
    }
  }

  autoAdjust() {
    console.log("auto adjusting, please wait.");

    AsyncApiCall.post('paymentVoucherAutoAdjust', {payment_voucher_id: this.payment_voucher_id}).subscribe(resp=>{
      if(resp.statusCode === StatusCodes.codes.OK){
        this.getVoucherDetails();
      }else {
        Notification.error("Could not auto adjust your voucher.");
      }
    });
  }

  showAlert(type) {
    let that = this;
    if (type == "success-message") {
      swal({
        title: "Payment successfull.",
        text: "Payment voucher recorded successfully.",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "Proceed",
        buttonsStyling: false
      }).then(function() {
        that.router.navigateByUrl("/vouchers/payment");
      });
    } else if (type == "warning-message-and-confirmation") {
      swal({
        title: "Are you sure?",
        text: "Do you want to adjust this balance at a later date?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "Adjust later",
        buttonsStyling: false
      }).then(function() {
        swal({
          title: "Payment successful",
          text: "Payment has been recorded successfully.",
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          that.router.navigateByUrl("/vouchers/payment");
        }, 3000);
      });
    }
  }
}
