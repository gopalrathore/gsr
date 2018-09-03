import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { StatusCodes } from "../../../../../@core/dataset/dataset";
import { Notification, StringManipulation, HelperFunction } from "../../../../../@core/utility-functions/utility-function";
import { AsyncApiCall } from "../../../../../@core/services/async-api-call";
import { TransfereService } from "../../../../../@core/services/transfer.service";
import { CompanyServiceService } from "../../../../../@core/services/company-service.service";
import { Vendor } from "./vendor";

@Component({
  selector: "app-edit-vendor",
  templateUrl: "./add-vendor.component.html",
  styleUrls: ["./add-vendor.component.css"]
})

export class EditVendorComponent extends Vendor {
  public componentName: string = "Edit Vendor";

  protected vendorId: number = this.transfereService.getData();

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected transfereService: TransfereService,
    protected router: Router
  ) {
    super(companyServiceService, router);
    if (this.vendorId) {
      this.getVendorData();
    } else {
      this.router.navigateByUrl("/business-parties/vendors");
    }
  }


  /**
   * @description get individual vendor data to be edited
   * @returns void
   */
  protected getVendorData(): void {
    AsyncApiCall.get("vendor", { vendor_id: this.vendorId }).subscribe(resp => {
      let output: string;
      this.ifscValid = !(resp.data[0].vendor_bank_ifsc === null);
      this.vendor = resp.data[0];

      if (typeof this.vendor.vendor_note === "string") {
        output = StringManipulation.decodeHtml(
          StringManipulation.escapeHtml(this.vendor.vendor_note)
        );
        this.vendor.vendor_note = output;
      }

      if (typeof this.vendor.vendor_primary_contact_remark === "string") {
        output = StringManipulation.decodeHtml(
          StringManipulation.escapeHtml(
            this.vendor.vendor_primary_contact_remark
          )
        );
        this.vendor.vendor_primary_contact_remark = output;
      }

      for (let i: number = 0; i < this.vendor.contact_person.length; i++) {
        if (typeof this.vendor.contact_person[i].note === "string") {
          output = StringManipulation.decodeHtml(
            StringManipulation.escapeHtml(this.vendor.contact_person[i].note)
          );
          this.vendor.contact_person[i].note = output;
        }
      }

      this.validate.changerefrence(this.vendor);
    });
  }

  /**
   * @description edit vendor to database
   * @param isValid true if vendor form is valid
   * @param data vendor form data
   */
  public vendorSubmit(isValid: boolean, data: object) {
    if (isValid && this.patchCallable) {
      this.patchCallable = false;

      if (this.vendor.vendor_bank_account_type === null) {
        delete this.vendor.vendor_bank_account_type;
      }

      if (HelperFunction.hasData(this.vendor.vendor_bank_ifsc)) {
        this.vendor.vendor_bank_branch_name = "";
        this.vendor.vendor_bank_name = "";
      }

      AsyncApiCall.patch("vendor", this.vendor).subscribe(resp => {
        this.patchCallable = true;
        if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
          this.showAlert("Vendor has been edited successfully.");
        } else {
          Notification.error(resp.message);
        }
      });
    } else if (!this.patchCallable) {
      console.warn("editVendor: waiting for api response.");
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }
}
