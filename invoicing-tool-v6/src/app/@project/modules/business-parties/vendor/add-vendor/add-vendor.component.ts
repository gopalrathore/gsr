import { HelperFunction } from '../../../../../@core/utility-functions/utility-function';
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { StatusCodes } from "../../../../../@core/dataset/dataset";
import { AsyncApiCall } from "../../../../../@core/services/async-api-call";
import { Notification } from "../../../../../@core/utility-functions/utility-function";

import { CompanyServiceService } from "../../../../../@core/services/company-service.service";
import { Vendor } from "./vendor";

declare var $: any;

@Component({
  selector: "app-add-vendor",
  templateUrl: "./add-vendor.component.html",
  styleUrls: ["./add-vendor.component.css"]
})
export class AddVendorComponent extends Vendor {
  public componentName: string = "Add Vendor";

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected router: Router
  ) {
    super(companyServiceService, router);
  }

  ngAfterViewInit() {
    this.validate.validations();
  }

  /**
   * @description vrndor add
   * @param isValid true if vendor form in correctly filled
   * @param data vendor form data
   * @returns void
   */
  public vendorSubmit(isValid: boolean, data: object): void {
    if (isValid && this.putCallable) {
      this.putCallable = false;

      if (HelperFunction.hasnoData(this.vendor.vendor_bank_ifsc)){
        this.vendor.vendor_bank_branch_name = "";
        this.vendor.vendor_bank_name = "";
      }

      AsyncApiCall.put("vendor", this.vendor).subscribe(resp => {
        this.putCallable = true;
        if (resp.statusCode === StatusCodes.codes.CREATED) {
          this.showAlert("Vendor has been added successfully.");
        } else {
          Notification.error(resp.message);
        }
      });
    } else if (!this.putCallable) {
      console.warn("addVendor: waiting for api response.");
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }
}
