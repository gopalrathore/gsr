import { Bank } from './bank';
import { StatusCodes } from "../../../../@core/dataset/dataset";
import { AsyncApiCall } from "../../../../@core/services/async-api-call";
import { Notification } from "../../../../@core/utility-functions/utility-function";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";



@Component({
  selector: "app-add-bank",
  templateUrl: "./add-bank.component.html",
  styleUrls: ["./add-bank.component.css"]
})
export class AddBankComponent extends Bank {


  public componentName: string = "Add Bank";
  
  constructor(protected router: Router) {
    super(router);
  }

  bankSubmit(isValid: boolean): void {
    if (isValid && this.putCallable && this.ifscValid) {
      this.putCallable = false;
      AsyncApiCall.put("bank", this.bank).subscribe(resp => {
        this.putCallable = true;
        if (resp.statusCode === StatusCodes.codes.CREATED) {
          this.showAlert("Bank has been added successfully.");
        } else {
          Notification.error(resp.message);
        }
      });
    } else if (!this.putCallable) {
      console.warn("addBank: waiting for api response.");
    } else {
      Notification.error("Please fill all required Fields!");
    }
    
  }
}
