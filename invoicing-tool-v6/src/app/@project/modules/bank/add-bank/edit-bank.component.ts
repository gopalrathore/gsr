import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { StatusCodes } from "../../../../@core/dataset/dataset";
import { AsyncApiCall } from "../../../../@core/services/async-api-call";
import { Notification, validations, StringManipulation } from "../../../../@core/utility-functions/utility-function";
import { TransfereService } from "../../../../@core/services/transfer.service";
import { Bank } from "./bank";


@Component({
  selector: "app-edit-bank",
  templateUrl: "./add-bank.component.html",
  styleUrls: ["./add-bank.component.css"]
})
export class EditBankComponent extends Bank {

  public componentName: string = "Edit Bank";
  private bankId: number = this.transfereService.getData();

  public ifscValid:boolean = false;
  
  constructor(protected router: Router, private transfereService: TransfereService) {
    super(router);
    this.bankId ? this.getBankData() : this.router.navigateByUrl("/bank");
  }

  getBankData() {
    AsyncApiCall.get("bank", { bank_id: this.bankId }).subscribe(resp => {
      if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        let output: string;
        this.bank = resp.data[0];
        if (typeof (this.bank.remarks) === "string") {
          output = StringManipulation.decodeHtml(StringManipulation.escapeHtml(this.bank.remarks));
          this.bank.remarks = output;
        }
        console.log("bank", this.bank);
        this.ifscValid = true;
      } else {
        Notification.error("Something Went Wrong, Try again");
        this.router.navigateByUrl("/bank");
      }
    });
  }

  bankSubmit(isValid:boolean) {
    if (isValid && this.patchCallable) {
      this.patchCallable = false;
      AsyncApiCall.patch("bank", this.bank).subscribe(resp => {
        this.patchCallable = true;
        if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
          this.showAlert("Bank has been edited successfully.");
        } else {
          Notification.error(resp.message);
        }
      });
    } else if(!this.patchCallable){
      console.warn("editBank: waiting for api response.");
    }else {
      Notification.error("Please fill all required Fields!");
    }
  }

}
