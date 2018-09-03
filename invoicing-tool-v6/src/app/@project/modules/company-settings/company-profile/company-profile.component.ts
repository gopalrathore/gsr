import { AsyncApiCall } from "../../../../@core/services/async-api-call";
import { Notification, validations, HelperFunction } from "../../../../@core/utility-functions/utility-function";
import { Component, OnInit } from "@angular/core";
import { CompanyServiceService } from "../../../../@core/services/company-service.service";
import { Router } from "@angular/router";
import {
  StateList,
  CountryList,
  StatusCodes
} from "../../../../@core/dataset/dataset";

declare var $: any;
declare var swal: any;

@Component({
  selector: "app-company-profile",
  templateUrl: "./company-profile.component.html",
  styleUrls: ["./company-profile.component.css"]
})
export class CompanyProfileComponent implements OnInit {
  public company: any = {};
  private validate: validations = new validations(this.company);
  public state = new StateList();
  public countries = new CountryList();

  public patchCallable: boolean = true;

  constructor(
    public companyServiceService: CompanyServiceService,
    private router: Router
  ) {}

  ngOnInit() {    
    this.company = this.companyServiceService.getCompany();
    this.setDefaults();
    this.validate.validations();
  }

  setDefaults() {
    if(HelperFunction.hasnoData(this.company["sell_on_ecommerce"]))
      this.company["sell_on_ecommerce"] = "0";
    if(HelperFunction.hasnoData(this.company["company_composition"]))
      this.company["company_composition"] = "0";
  }

  profileSubmit(isValid) {
    if (isValid && this.patchCallable) {
      this.patchCallable = false;

      AsyncApiCall.patch("company", this.company).subscribe(resp => {
        this.patchCallable = true;
        if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
          console.info("profileSubmit : ", resp.statusCode, resp);
          this.companyServiceService.setCompany(this.company);
          this.companyServiceService.getCompanies();
          swal({
            text: "Company Data Saved!",
            showConfirmButton: true,
            title: "Success",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            confirmButtonText: "Proceed",
            buttonsStyling: false
          });
        } else {
          console.error("profileSubmit : ", resp.statusCode, resp.message);
          Notification.error(resp.message);
        }
      });
    } else if (!this.patchCallable) {
      console.warn("profileSubmit : ", "Waiting for API response.");
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }

  select_company_type(gstin) {
    this.company.company_country = "India";
    this.company.company_gst_id = this.company.company_gst_id.toUpperCase();
    this.company.company_pan = this.company.company_gst_id.slice(2, 12);
    this.company.company_state_code = this.company.company_gst_id.slice(0, 2);
    if (gstin.length > 5) {
      let gstin_type = gstin.slice(5, 6);
      gstin_type = gstin_type.toUpperCase();
      if (gstin_type === "C") this.company.company_type = "Company";
      else if (gstin_type === "P")
        this.company.company_type = "Sole Proprietor";
      else if (gstin_type === "H")
        this.company.company_type = "Hindu Undivided Family";
      else if (gstin_type === "F")
        this.company.company_type = "Partnership Firm";
      else if (gstin_type === "A")
        this.company.company_type = "Association Of Persons";
      else if (gstin_type === "T") this.company.company_type = "Trust";
      else if (gstin_type === "B")
        this.company.company_type = "Body Of Individuals";
      else if (gstin_type === "L")
        this.company.company_type = "Local Authority";
      else if (gstin_type === "J")
        this.company.company_type = "Artificial Juridical Person";
      else if (gstin_type === "G") this.company.company_type = "Government";
      else {
        this.company.company_type = "";
        Notification.error("Invalid GSTIN. Please try again.");

        this.company.company_gst_id = gstin.slice(0, 5);
      }
    }
  }
}
