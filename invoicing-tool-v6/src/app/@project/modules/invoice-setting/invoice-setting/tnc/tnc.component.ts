import { CompanyServiceService } from "../../../../../@core/services/company-service.service";
import { StatusCodes } from "../../../../../@core/dataset/dataset";
import { Notification } from "../../../../../@core/utility-functions/utility-function";
import { AsyncApiCall } from "../../../../../@core/services/async-api-call";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tnc",
  templateUrl: "./tnc.component.html",
  styleUrls: ["./tnc.component.css"]
})
export class TncComponent implements OnInit {
  public tnc_invoice_type: string = "0";
  public company_tnc: string = "";
  public putCallable:boolean = true;

  constructor(public companyServiceService: CompanyServiceService) {}

  ngOnInit() {}

  tncSubmit(isValid) {
    if (isValid && this.putCallable) {
      this.putCallable = false;
      AsyncApiCall.put("salesInvoiceTncAndDec", {
        invoice_type: this.tnc_invoice_type,
        tnc: this.company_tnc
      }).subscribe(resp => {
        this.putCallable = true;
        if (resp.statusCode === StatusCodes.codes.CREATED) {
          Notification.success("Terms & Condition Changed");
        }
      });
    }else if(!this.putCallable){
      console.warn("tnc: waiting for api response.");
    }else {
      Notification.error("Please fill all required Fields!");
    }
  }

  getTNC() {
    if (this.tnc_invoice_type !== "0") {
      AsyncApiCall.get("salesInvoiceTncAndDec", {
        invoice_type: this.tnc_invoice_type
      }).subscribe(resp => {
        if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION)
          this.company_tnc = resp.data[0]["tnc"];
      });
    }
  }
}
