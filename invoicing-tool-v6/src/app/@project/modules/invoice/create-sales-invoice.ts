import { StatusCodes } from '../../../@core/dataset/status-code/codes';
import { AsyncApiCall } from '../../../@core/services/async-api-call';
import { SalesInvoice } from './sales/@salesInvoiceCreationController/sales-invoice';
import { Notification, StringManipulation } from '../../../@core/utility-functions/utility-function';
import { CompanyServiceService } from "../../../@core/services/company-service.service";

declare var $: any;

export class createSalesInvoice extends SalesInvoice {

  constructor(protected companyServiceService: CompanyServiceService, protected invoice_type:string) {
    super(companyServiceService, invoice_type);
  }

  protected getTncandDeclaration():void {
    let dec_output;
    let tnc_output;
    AsyncApiCall.get('salesInvoiceTncAndDec', {invoice_type: this.invoice_type})
      .subscribe(resp => {
        if(resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
          this.invoiceData.declaration = resp.data[0]["declaration"];
          this.invoiceData.tnc = resp.data[0]['tnc'];
          if (typeof this.invoiceData.declaration === "string") {
            dec_output = StringManipulation.decodeHtml(StringManipulation.escapeHtml(this.invoiceData.declaration));
            this.invoiceData.declaration = dec_output;
          }
          if (typeof this.invoiceData.tnc === "string") {
            tnc_output = StringManipulation.decodeHtml(StringManipulation.escapeHtml(this.invoiceData.tnc));
            this.invoiceData.tnc = tnc_output;
          }
        }
      });
  }

  public formatChanged(format:string):void {
    this.createInvoiceInvoiceNumber.getInvoiceNumber();
  }

  calculator(){
    this.createInvoiceCaluculator.calculator();
  }

  clientSelected(clientId?){
    this.createInvoiceClient.clientSelected(clientId);
  }

  itemSelected(item_name:string,index:number):void{
    this.createInvoiceInventory.itemSelected(item_name,index);
  }

  protected invoiceSubmit(isValid:boolean):void {
    console.log("invoice", this.invoiceData);
    
    for (var i = 0; i < this.invoiceData.invoice_items.length; i++) {
      if (this.invoiceData.invoice_items[i].item_id === undefined) {
        Notification.error("Please add " + this.invoiceData.invoice_items[i].item_name + " to your inventory.", "top", "right");
        return null;
      }
    }

    this.invoiceData.custom_fields = JSON.stringify(this.custom_fields);
    this.invoiceData.same_as_billing = this.invoiceData.same_as_billing ? '1' : '0';
    if (this.invoiceData.same_as_billing === '1') {
      delete this.invoiceData.client_shipping_address;
      delete this.invoiceData.client_shipping_address_2;
      delete this.invoiceData.client_shipping_address_3;
      delete this.invoiceData.client_shipping_address_4;
      delete this.invoiceData.client_shipping_state_code;
      delete this.invoiceData.client_shipping_state_name;
      delete this.invoiceData.client_shipping_country;
    }

    if (this.invoiceData.transport_mode === "") {
      delete this.invoiceData["transport_mode"];
      delete this.invoiceData["transporter_name"];
      delete this.invoiceData["transport_source"];
      delete this.invoiceData["transport_destination"];
      delete this.invoiceData["vehicle_number"];
      delete this.invoiceData["lr_number"];
    }
    if (this.invoiceData.extra_value === "") {
      this.invoiceData.extra_value = '0';
    }

    this.mailData.company_name = this.invoiceData.client_name;
    this.mailData.invoice_type = this.invoiceData.invoice_type;

    let sendData = JSON.parse(JSON.stringify(this.invoiceData));

    sendData.invoice_items.map((item, i) => {
      if (item.item_unit === item.item_unit_primary_actual) {
        sendData.invoice_items[i].item_unit_actual = item.item_unit_primary_actual;
        sendData.invoice_items[i].item_unit_display = item.item_unit_primary_display;
      } else {
        sendData.invoice_items[i].item_unit_actual = item.item_unit_secondary_actual;
        sendData.invoice_items[i].item_unit_display = item.item_unit_secondary_display;
      }
    });

    if(this.putCallable){
      this.putCallable = false;
      AsyncApiCall.put('salesInvoice', sendData)
      .subscribe(resp => {
        this.putCallable = true;
        if (resp.statusCode === StatusCodes.codes.CREATED) {
          this.invoice_id = resp.data[0].invoice_id;
          $(".modal-btn").click();
        } else {
          if (resp["message"] == "Invalid invoice number") {
            this.createInvoiceInvoiceNumber.getInvoiceNumber();
            Notification.error("this invoice number was already used");
          } else {
            Notification.error(resp.message);
          }
        }
      });
    }else {
      console.log("invoice submit : ", "Waiting for API response.");
    }
  }


  protected checkAutoComplete(client:any, client_id:string, client_name:string):void {
    this.invoiceData = this.createInvoiceClient.checkAutoComplete(this.invoiceData, client, client_id, client_name)
  }

}
