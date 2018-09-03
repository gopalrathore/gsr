import { StatusCodes } from '../../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransfereService } from "../../../../../@core/services/transfer.service";
declare var $: any;
declare var swal: any;

declare interface VoucherData {
  receipt_voucher_balance: number;
  insert_date: string;
  receipt_voucher_amount: number;
  receipt_amount_adjusted: number;
  inserted_ts?:string;
}

@Component({
  selector: "app-reciept-voucher-transaction",
  templateUrl: "./reciept-voucher-transaction.component.html",
  styleUrls: ["./reciept-voucher-transaction.component.css"]
})

export class RecieptVoucherTransactionComponent implements OnInit {
  public tableData;
  public putCallable:boolean = true;
  public voucherData:VoucherData = {
    receipt_voucher_balance: 0,
    receipt_voucher_amount: 0,
    receipt_amount_adjusted: 0,
    insert_date: new Date().toDateString()
  };
  transfer_data = this.transfereService.getData();
  receipt_voucher_id: any;
  client_id: any = null;
  inputAmt = [];
  constructor(
    private transfereService: TransfereService,
    private router: Router
  ) {
    if (this.transfer_data) {
      console.log("tranfer data", this.transfer_data);             
      this.receipt_voucher_id = this.transfer_data;
      this.getVoucherDetails();
    } else {
      this.router.navigateByUrl("/vouchers/receipt");
    }
  }

  ngOnInit() { }

  getCurrentTransaction() {
    AsyncApiCall.get('salesInvoiceBalance', { client_id: this.client_id })
      .subscribe(resp => {
        console.log("current txn detail", resp);
        this.tableData = resp.data;
      });
  }

  getVoucherDetails() {
    AsyncApiCall.get('receiptVoucherBalance', { receipt_voucher_id: this.receipt_voucher_id })
      .subscribe(resp => {
        if(resp.statusCode==StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){        
          this.voucherData = resp.data[0];
          this.client_id = resp.data[0].client_id;
          this.getCurrentTransaction();
        }
      });
  }

  addTransaction(invoice_id, amount) {
    if(this.putCallable){
      this.putCallable = false;
      let txnData = {
        receipt_voucher_id: this.receipt_voucher_id, 
        invoice_id: invoice_id, 
        transaction_amount: amount
      }
      AsyncApiCall.put('receiptVoucherTransaction', txnData)
        .subscribe(resp => {
          this.putCallable = true;
          if(resp.statusCode==StatusCodes.codes.CREATED){
            Notification.success("Transaction has been recorded successfully.");
            this.getCurrentTransaction();
            this.getVoucherDetails();
          }else {
            Notification.error("Something went wrong!");
          }        
        });

    }else {
      console.warn("receipt voucher txn: waiting for api response.");      
    }
    
  }

  autoAdjust() {
    console.log("auto adjusting, please wait.");    
  }

  showAlert(type:string):void {
    let that = this;
    if (type == "success-message") {
      swal({
        title: "Receipt successfull.",
        text: "Receipt voucher recorded successfully.",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "Proceed",
        buttonsStyling: false
      }).then(function() {
        that.router.navigateByUrl("/vouchers/receipt");
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
          that.router.navigateByUrl("/vouchers/receipt");
        }, 3000);
      });
    }
  }
}
