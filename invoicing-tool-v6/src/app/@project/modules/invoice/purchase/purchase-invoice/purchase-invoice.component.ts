import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { PurchaseInvoice } from '../@purchaseInvoiceCreationController/purchase-invoice';
import { Notification, StringManipulation, validations } from '../../../../../@core/utility-functions/utility-function';
import { Router } from "@angular/router";

import { Component, OnInit, AfterViewInit } from "@angular/core";
import { StatusCodes } from "../../../../../@core/dataset/dataset";
import { CompanyServiceService } from "../../../../../@core/services/company-service.service";

declare var $: any;
declare var swal: any;

@Component({
  selector: "app-purchase-invoice",
  templateUrl: "./purchase-invoice.component.html",
  styleUrls: ["./purchase-invoice.component.css"]
})
export class PurchaseInvoiceComponent extends PurchaseInvoice implements OnInit {
 
  public putCallable: boolean = true;
  protected validate = new validations(this.purchaseData);
  public path:string = "";
  public uploadedFileLink:string = "";

  constructor(
    public companyServiceService: CompanyServiceService,
    private router: Router
  ) {
    super(companyServiceService)
  }

  ngAfterViewInit() {
    this.validate.validations();
    this.getTncandDeclaration();
  }

  ngOnInit() {
    //this.custom_fields = this.companyServiceService.getPreference();
    // this.vendorNameSelected = false;
    $(".switch").bootstrapSwitch({
      onColor: "primary",
      onText: "Yes",
      offText: "No"
    });
    $('[rel="tooltip"]').tooltip();
  }

  protected getTncandDeclaration():void {
    let dec_output;
    let tnc_output;
    AsyncApiCall.get('purchaseInvoiceTncAndDec', {invoice_type: 'PI'})
      .subscribe(resp => {
        if(resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
          this.purchaseData.declaration = resp.data[0]["declaration"];
          this.purchaseData.tnc = resp.data[0]['tnc'];
          if (typeof this.purchaseData.declaration == "string") {
            dec_output = StringManipulation.decodeHtml(StringManipulation.escapeHtml(this.purchaseData.declaration));
            this.purchaseData.declaration = dec_output;
          }
          if (typeof this.purchaseData.tnc == "string") {
            tnc_output = StringManipulation.decodeHtml(StringManipulation.escapeHtml(this.purchaseData.tnc));
            this.purchaseData.tnc = tnc_output;
          }
        }
      });
  }

  calculator(){
    this.createInvoiceCaluculator.calculator();
  }

  vendorSelected(){
    this.createInvoiceVendor.vendorSelected();
  }

  itemSelected(item_name,index){
    this.createInvoiceInventory.itemSelected(item_name,index);
  }  

  public purchaseSubmit(isValid:boolean):void {
    if (isValid && this.putCallable) {
      this.putCallable = false;
      for (var i = 0; i < this.purchaseData.purchase_items.length; i++) {
        if (this.purchaseData.purchase_items[i].item_id == undefined) {
          Notification.error("Please add " + this.purchaseData.purchase_items[i].item_name + " to your inventory.", "top", "right");
          return null;
        }
      }
      this.purchaseData.custom_fields = JSON.stringify(this.custom_fields);
      this.purchaseData.same_as_billing = this.purchaseData.same_as_billing ? '1' : '0';
      if (this.purchaseData.same_as_billing == '1') {
        delete this.purchaseData.vendor_shipping_address;
        delete this.purchaseData.vendor_shipping_address_2;
        delete this.purchaseData.vendor_shipping_address_3;
        delete this.purchaseData.vendor_shipping_address_4;
        delete this.purchaseData.vendor_shipping_state_code;
        delete this.purchaseData.vendor_shipping_state_name;
        delete this.purchaseData.vendor_shipping_country;
      }

      if (this.purchaseData.transport_mode === "") {
        delete this.purchaseData["transport_mode"];
        delete this.purchaseData["transporter_name"];
        delete this.purchaseData["transport_source"];
        delete this.purchaseData["transport_destination"];
        delete this.purchaseData["vehicle_number"];
        delete this.purchaseData["lr_number"];
      }

      this.mailData.company_name = this.purchaseData.vendor_name;
      this.mailData.invoice_type = "PI";

      let sendData = JSON.parse(JSON.stringify(this.purchaseData));

      sendData.purchase_items.map((item, i) => {
        if (item.item_unit == item.item_unit_primary_actual) {
          sendData.purchase_items[i].item_unit_actual = item.item_unit_primary_actual;
          sendData.purchase_items[i].item_unit_display = item.item_unit_primary_display;
        } else {
          sendData.purchase_items[i].item_unit_actual = item.item_unit_secondary_actual;
          sendData.purchase_items[i].item_unit_display = item.item_unit_secondary_display;
        }
      });

      let that = this;

      AsyncApiCall.put('purchaseInvoice', sendData)
        .subscribe(resp => {
          this.putCallable = true;
          if (resp.statusCode == StatusCodes.codes.CREATED) {
            this.invoice_id = resp.data[0].purchase_id;
            swal({
              title: "Invoice Created!",
              timer: 2000,
              showConfirmButton: false
            });
            $(".modal-btn").click();
            // setTimeout(function() {
            //   that.router.navigateByUrl("/invoice/purchase");
            // }, 2000);
          } else {
            Notification.error(resp.message);
          }
        });
    } else if(!this.putCallable) {
      console.log("purchase invoice adding : ", "Waiting for API response.");
    } else {
      Notification.error("Please fill all required Fields!")
    }
  }

  protected checkAutoComplete(vendor:any, vendor_id:string, vendor_name:string):void {
    this.purchaseData = this.createInvoiceVendor.checkAutoComplete(this.purchaseData, vendor, vendor_id, vendor_name)
  }
  
  public fileUploaded(path: string): void {}
}
