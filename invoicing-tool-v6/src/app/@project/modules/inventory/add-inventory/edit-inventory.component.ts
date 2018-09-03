import { validations } from '../../../../@core/utility-functions/utility-function';

import { StatusCodes } from "../../../../@core/dataset/dataset";
import { AsyncApiCall } from "../../../../@core/services/async-api-call";
import { Notification } from "../../../../@core/utility-functions/utility-function";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CompanyServiceService } from "../../../../@core/services/company-service.service";
import { TransfereService } from "../../../../@core/services/transfer.service";
import { Inventory } from "./inventory";


@Component({
  selector: "app-edit-inventory",
  templateUrl: "./add-inventory.component.html",
  styleUrls: ["./add-inventory.component.css"]
})
export class EditInventoryComponent extends Inventory {
  private adjustList: any[] = [];
  private adjustListData: any = {
    adjustment_reason: ""
  };

  protected validate2 = new validations(this.adjustListData, this.constructor.name);

  

  public enableAdjustment: boolean = true;

  public componentName: string = "Edit Item";
  protected InventoryId: string = this.transfereService.getData();

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected transfereService: TransfereService,
    protected router: Router
  ) {
    super(companyServiceService, router);

    if (this.InventoryId) this.getInventoryData();
    else this.router.navigateByUrl("inventory");
  }

  ngAfterViewInit() {
    this.validate.validations();
    this.validate2.validations();
    this.getAdjustList();
  }

  /**
   * @description get individual inventory data to be edited
   * @returns void
   */
  protected getInventoryData(): void {
    let output;
    AsyncApiCall.get("inventory", { item_id: this.InventoryId }).subscribe(
      resp => {
        this.product = resp.data[0];
        if (typeof this.product.item_desc === "string") {
          output = this.decodeHtml(this.escapeHtml(this.product.item_desc));
          this.product.item_desc = output;
        }
        if (typeof this.product.item_taxation_exempt_reason === "string") {
          output = this.decodeHtml(
            this.escapeHtml(this.product.item_taxation_exempt_reason)
          );
          this.product.item_taxation_exempt_reason = output;
        }
        if (typeof this.product.item_note == "string") {
          output = this.decodeHtml(this.escapeHtml(this.product.item_note));
          this.product.item_note = output;
        }
      }
    );
  }

  /**
   * @description remove the extra line break
   * @param unsafe unsafe string with the extra line break
   * @returns string
   */
  protected escapeHtml(unsafe: string): string {
    return unsafe.replace(/\\n/g, "&#13;&#10;");
  }

  /**
   * @description get the string to be written on the textarea
   * @param html inner html of the textarea
   * @returns string
   */
  protected decodeHtml(html: string): string {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  /**
   * @description adjust inventory
   * @returns void
   */
  protected getAdjustList(): void {
    AsyncApiCall.view("adjustment", {
      item_id: this.InventoryId,
      FIELDS: [
        "adjustment_id",
        "adjustment_qty",
        "adjustment_reason",
        "inserted_ts"
      ],
      ORDER: { ORDER_BY: "company_id" },
      LIMIT: 1000
    }).subscribe(resp => {
      // this.adjustList = resp.data;
      if (resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        this.adjustList = resp.data;
      }
    });
  }

  /**
   * @description submit adjusted data
   * @param isvalid check if form valid
   * @param data form data
   * @returns void
   */
  protected adjustSubmit(isvalid: boolean, data: any): void {
    data["item_id"] = this.InventoryId;
    if (isvalid) {
      this.adjustListData.adjustment_reason = "";
      AsyncApiCall.put("adjustment", data).subscribe(resp => {
        console.log("resp", resp);
        this.getAdjustList();
      });   
    }
  }

  /**
   * @description submit item data
   * @param isValid check if form in valid
   * @returns void
   */
  public productSubmit(isValid: boolean): void {
    if (this.product.item_hsn_code === "") {
      delete this.product["item_hsn_code"];
    }
    if (this.product.item_type === "S") {
      delete this.product.item_unit_primary_actual;
      delete this.product.item_unit_primary_display;
      delete this.product.item_unit_secondary_actual;
      delete this.product.item_unit_secondary_display;
      delete this.product.primary_secondary_conversion_factor;
    }
    if (isValid && this.patchCallable) {
      this.patchCallable = false;
      if (this.product.item_taxation_category === "E") {
        this.product.item_tax_rate_interstate = "0.00";
        this.product.item_tax_rate_intrastate = "0.00";
      }
      AsyncApiCall.patch("inventory", this.product).subscribe(resp => {
        this.patchCallable = true;
        if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
          this.showAlert("Intentory has been edited successfully!");
        } else {
          Notification.error(resp.message, "top", "right");
        }
      });
    } else if(!this.patchCallable){
      console.warn("editInventory: waiting for api response.");
    } else {
      Notification.error("Please fill all required Fields!", "top", "right");
    }
  }
}
