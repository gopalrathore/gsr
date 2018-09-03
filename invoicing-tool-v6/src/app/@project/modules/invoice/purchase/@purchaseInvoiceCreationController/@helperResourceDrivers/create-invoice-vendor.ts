import { StatusCodes } from '../../../../../../@core/dataset/dataset';
import { AutoComplete } from '../../../../../../@core/services/Autocomplete';
import { SyncApiCall } from '../../../../../../@core/services/sync-api-call';
import { InvoiceData } from '../@interfaces/purchaseInvoiceInterfaces';

declare var $: any;

declare interface VendorBillingAddress{
  vendor_address: string;
  vendor_address_2: string;
  vendor_address_3:string;
  vendor_state_code: string;
  vendor_state_name: string;
  vendor_country: string;
}

declare interface EmailPerson {
  to: any[],
  cc:any[],
  all:any[]
}

export class CreateInvoiceVendor{

  public vendorNameAutocomplete:AutoComplete = new AutoComplete();

  public contact_person:EmailPerson = {
    to: [],
    cc: [],
    all: []
  };
  public vendorNameSelected: boolean;
  public billing_address: VendorBillingAddress;
  public vendor_gstin:string;
  public vendor_gsttreatment:string

  constructor(private purchaseData:InvoiceData, protected companyServiceService, protected createInvoiceCaluculator){
    this.vendorNameAutocomplete.newAdd = true;
    this.vendorNameAutocomplete.get_full_list("vendor","vendor_company_nickname","vendor_id");
    this.setDefaults();
  }

  private setDefaults(){
    this.billing_address = {
      vendor_address: '',
      vendor_address_2: '',
      vendor_address_3:'',
      vendor_state_code: '',
      vendor_state_name: '',
      vendor_country: '',
    }
  }

  private emailRecipient(vendorDetail):EmailPerson{
    let emailPerson:EmailPerson = {
      to: [],
      cc: [],
      all: []
    };
    if(vendorDetail.vendor_primary_contact_email && vendorDetail.vendor_primary_contact_email!=""){
      emailPerson.all.push({
        name: vendorDetail.vendor_primary_contact_first_name + ' ' + vendorDetail.vendor_primary_contact_last_name,
        email: vendorDetail.vendor_primary_contact_email
      });
      emailPerson.to.push({
        name: vendorDetail.vendor_primary_contact_first_name + ' ' + vendorDetail.vendor_primary_contact_last_name,
        email: vendorDetail.vendor_primary_contact_email
      })
    }

    vendorDetail.contact_person.map(person => {

      if(person.email_marking=='Yes'){
        emailPerson.cc.push({
          name: person.first_name+' '+person.last_name,
          email: person.email
        });
        emailPerson.all.push({
          name: person.first_name+' '+person.last_name,
          email: person.email
        });
      }else if(person.email!=null && person.email!=""){
        emailPerson.all.push({
          name: person.first_name+' '+person.last_name,
          email: person.email
        });
        emailPerson.cc.push({
          name: person.first_name+' '+person.last_name,
          email: person.email
        });
      }
    });
    return emailPerson;
  }

  private setNewVendor(vendor_id:string):InvoiceData{

    let resp = SyncApiCall.get('vendor', {vendor_id: vendor_id});     
    let purchaseData:InvoiceData = this.purchaseData;  
    console.log("vendor detail", resp);
    
    if(resp.statusCode !== StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) return this.purchaseData;

      let newVendor:object = resp.data[0];
      
      this.contact_person = this.emailRecipient(newVendor);
      
      purchaseData.vendor_name = newVendor["vendor_company"];
      purchaseData.vendor_shipping_address = newVendor["vendor_shipping_address"],
      purchaseData.vendor_shipping_address_2 = newVendor["vendor_shipping_address_2"],
      purchaseData.vendor_shipping_address_3 = newVendor["vendor_shipping_address_3"],
      purchaseData.vendor_shipping_address_4 = newVendor["vendor_shipping_address_4"],
      purchaseData.vendor_shipping_state_code = newVendor["vendor_shipping_state_code"],
      purchaseData.vendor_shipping_state_name = newVendor["vendor_shipping_state_name"],
      purchaseData.vendor_shipping_country = newVendor["vendor_shipping_country"]

      this.vendor_gsttreatment = newVendor['vendor_gsttreatment'];
      this.vendor_gstin = newVendor["vendor_gst_id"];

      purchaseData.vendor_name = newVendor["vendor_first_name"] + (newVendor["vendor_last_name"] == null ? "" : " " + newVendor["vendor_last_name"]);
      this.billing_address = {
        vendor_address: newVendor["vendor_address"],
        vendor_address_2: newVendor["vendor_address_2"],
        vendor_address_3: newVendor["vendor_address_3"],
        vendor_state_code: newVendor["vendor_state_code"],
        vendor_state_name: newVendor["vendor_state_name"],
        vendor_country: newVendor["vendor_country"]
      };
      
      purchaseData.vendor_id = newVendor["vendor_id"];
      purchaseData.vendor_state_code = newVendor["vendor_state_code"];
      purchaseData.vendor_name = newVendor["vendor_company"];

      purchaseData.payment_due_days = newVendor['vendor_paymentterms'];
      this.createInvoiceCaluculator.getRates(this.companyServiceService.getCompany());
      this.purchaseData =  purchaseData;
  }

  public newVendorAdded(vendor_id:string):void {
    this.vendorNameAutocomplete.get_full_list("vendor", "vendor_company_nickname", "vendor_id");
    this.vendorNameSelected = true;
    this.setNewVendor(vendor_id);
    
  }


  public vendorSelected():InvoiceData {
    if (this.purchaseData.vendor_name == "+ Add New") {
      this.purchaseData.vendor_name = "";
      $(".newVendor").click();
      return null;
    }
    else{
      let vendor_id = this.vendorNameAutocomplete.getsearchListId(this.purchaseData.vendor_name);
      this.vendorNameSelected = true;
      this.setNewVendor(vendor_id);
    }

  }

  public clearvendorAutocomplete():void {
    this.vendor_gstin = "";
    this.purchaseData.vendor_name = "";
    this.purchaseData.vendor_id = "";
    this.vendorNameSelected = false;
    this.vendor_gsttreatment = "";
    this.setDefaults();
  }

  public checkAutoComplete(purchaseData, vendor:any, vendor_id:string, vendor_name:string):InvoiceData {
    if (vendor == undefined || purchaseData[vendor_id] === "") {
      //WTF
      purchaseData[vendor_id] = "";
      purchaseData["vendor_id"] = "";
    } else if (purchaseData[vendor_id] !== vendor[vendor_name]) {
      purchaseData[vendor_id] = vendor[vendor_name];
    }
    return purchaseData
  }
}