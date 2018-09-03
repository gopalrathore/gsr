import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { StatusCodes } from "../../../../../@core/dataset/dataset";
import { AsyncApiCall } from "../../../../../@core/services/async-api-call";
import { Notification } from "../../../../../@core/utility-functions/utility-function";
import { Client } from "./client";
import { CompanyServiceService } from "../../../../../@core/services/company-service.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent extends Client {
  public componentName: string = "Add Client";
  constructor(
    protected companyServiceService: CompanyServiceService,
    protected router: Router
  ) {
    super(companyServiceService, router);
  }

 

  /**
   * @description add client to the database
   * @param isValid true if client form is valid
   * @param data client form data
   * @returns void
   */
  public clientSubmit(isValid: boolean, data: object): void {
    if (isValid && this.putCallable) {
      
      if (this.addShipping === false) {
        this.client["client_shipping_address"] = "";
        this.client["client_shipping_address_2"] = "";
        this.client["client_shipping_address_3"] = "";
        this.client["client_shipping_address_4"] = "";
        this.client["client_shipping_country"] = "";
        this.client["client_shipping_state_code"] = "";
        this.client["client_shipping_state_name"] = "";
      }

      this.putCallable = false;
      AsyncApiCall.put("client", this.client).subscribe(resp => {
        this.putCallable = true;
        if (resp.statusCode === StatusCodes.codes.CREATED) {
          this.showAlert("Client has been added successfully.");
        } else {
          Notification.error(resp.message, "top", "right");
        }
      });

    } else if (!this.putCallable) {
      console.warn("addClient : ", "Waiting for API response.");
    } else {
      Notification.error(
        "Please fill all required Fields!",
        "top",
        "right"
      );
    }
  }
}
