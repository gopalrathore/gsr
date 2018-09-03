import { endPoints } from '../../../../../environments/environment.prod';
import { Router } from "@angular/router";
import { AsyncApiCall } from "../../../../@core/services/async-api-call";
import { StatusCodes } from "../../../../@core/dataset/dataset";
import { validations } from "../../../../@core/utility-functions/utility-function";
declare var $: any;
declare var swal: any;

export interface BankInterface {
  account_type: string;
  ifsc: string;
  bank_name: string;
  branch_name: string;
  account_number: string;
  remarks: string;
}

export class Bank {
  public bank: BankInterface = {
    account_type: "S",
    ifsc: "",
    bank_name: null,
    branch_name: null,
    account_number: null,
    remarks: null
  };

  public ifscValid: boolean = false;
  public putCallable: boolean = true;
  public patchCallable: boolean = true;

  private validate: validations = new validations(this.bank);

  constructor(protected router: Router) {}

  checkIFSC(): void {
    this.ifscValid = false;
    if (this.bank.ifsc.length === 11) {
      AsyncApiCall.customGet(
        endPoints.IFSC + this.bank.ifsc
      ).subscribe(resp => {
        if (resp.statusCode === StatusCodes.codes.OK) {
          this.ifscValid = true;
          this.bank.bank_name = resp.data["BANK"];
          this.bank.branch_name = resp.data["BRANCH"];
        }
      });
    }
  }

  ngAfterViewInit() {
    this.validate.validations();
  }

  showAlert(message: string): void {
    let that = this;
    swal({
      title: "Success",
      text: message,
      type: "success",
      showCancelButton: false,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "Proceed",
      buttonsStyling: false
    }).then(function() {
      that.router.navigateByUrl("bank");
    });
  }
}
