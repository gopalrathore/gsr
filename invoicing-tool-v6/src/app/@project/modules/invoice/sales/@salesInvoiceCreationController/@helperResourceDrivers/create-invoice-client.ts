import { StatusCodes, StateList } from '../../../../../../@core/dataset/dataset';
import { AutoComplete } from '../../../../../../@core/services/Autocomplete';
import { SyncApiCall } from '../../../../../../@core/services/sync-api-call';
import { InvoiceData } from '../@interfaces/salesInvoiceInterfaces';

declare var $:any;
declare var swal:any;

export interface ClientBillingAddress{
  client_address: string;
  client_address_2: string;
  client_address_3:string;
  client_address_4:string;
  client_state_code: string;
  client_state_name: string;
  client_country: string;
}

declare interface EmailPerson {
  to: any[],
  cc:any[],
  all:any[]
}

export class CreateInvoiceClient{

  public clientNameAutocomplete:AutoComplete = new AutoComplete();

  public contact_person:EmailPerson = {
    to: [],
    cc: [],
    all: []
  };
  public clientNameSelected: boolean;
  public billing_address: ClientBillingAddress;
  public client_gstin:string;
  public client_gsttreatment:string;

  private stateList = new StateList();

  constructor(private invoiceData:InvoiceData, protected companyServiceService, protected createInvoiceCaluculator){
    this.clientNameAutocomplete.newAdd = true;
    this.clientNameAutocomplete.get_full_list("client","client_company_nickname","client_id");
    this.setDefaults();
  }

  private setDefaults(){
    this.billing_address = {
      client_address: '',
      client_address_2: '',
      client_address_3:'',
      client_address_4:'',
      client_state_code: '',
      client_state_name: '',
      client_country: '',
    }
  }

  private emailRecipient(clientDetail):EmailPerson{
    let emailPerson:EmailPerson = {
      to: [],
      cc: [],
      all: []
    };
    if(clientDetail.client_primary_contact_email && clientDetail.client_primary_contact_email!==""){
      emailPerson.all.push({
        name: clientDetail.client_primary_contact_first_name + ' ' + clientDetail.client_primary_contact_last_name,
        email: clientDetail.client_primary_contact_email
      });
      emailPerson.to.push({
        name: clientDetail.client_primary_contact_first_name + ' ' + clientDetail.client_primary_contact_last_name,
        email: clientDetail.client_primary_contact_email
      })
    }

    clientDetail.contact_person.map(person => {

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

  private setNewClient(client_id:string):InvoiceData{

    let resp = SyncApiCall.get('client', {client_id: client_id});     
    let invoiceData:InvoiceData = this.invoiceData;  

    if(resp.statusCode !== StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) return this.invoiceData;

      let newClient:object = resp.data[0];

      console.log("new client", newClient);
      if(invoiceData.invoice_type!=='EI' && newClient['client_gsttreatment']==='SEZ'){
        this.showAlert("Selected company is in SEZ");
      }

        this.contact_person = this.emailRecipient(newClient);
      
      invoiceData.client_name = newClient["client_company"];
      invoiceData.client_shipping_address = newClient["client_shipping_address"],
      invoiceData.client_shipping_address_2 = newClient["client_shipping_address_2"],
      invoiceData.client_shipping_address_3 = newClient["client_shipping_address_3"],
      invoiceData.client_shipping_address_4 = newClient["client_shipping_address_4"],
      invoiceData.client_shipping_state_code = newClient["client_shipping_state_code"],
      invoiceData.client_shipping_state_name = newClient["client_shipping_state_name"],
      invoiceData.client_shipping_country = newClient["client_shipping_country"]

      this.client_gsttreatment = newClient['client_gsttreatment'];
      this.client_gstin = newClient["client_gst_id"];

      invoiceData.client_name = newClient["client_first_name"] + (newClient["client_last_name"] == null ? "" : " " + newClient["client_last_name"]);
      this.billing_address = {
        client_address: newClient["client_address"],
        client_address_2: newClient["client_address_2"],
        client_address_3: newClient["client_address_3"],
        client_address_4: newClient["client_address_4"],
        client_state_code: newClient["client_state_code"],
        client_state_name: newClient["client_country"] === 'India' ? this.stateList.getStateName(newClient["client_state_code"]): newClient["client_state_name"],
        client_country: newClient["client_country"]
      };
      
      invoiceData.client_id = newClient["client_id"];
      invoiceData.client_state_code = newClient["client_state_code"];
      invoiceData.client_name = newClient["client_company"];

      invoiceData.payment_due_days = newClient['client_paymentterms'];
      this.createInvoiceCaluculator.getRates(this.companyServiceService.getCompany());
      this.invoiceData =  invoiceData;

      
      
      
  }

  public newClientAdded(client_id:string):void {
    this.clientNameAutocomplete.get_full_list("client", "client_company_nickname", "client_id");
    this.clientNameSelected = true;
    this.setNewClient(client_id);
    
  }


  public clientSelected(clientId?:string):InvoiceData {
    if (this.invoiceData.client_name == "+ Add New") {
      this.invoiceData.client_name = "";
      $(".newClient").click();
      return null;
    }
    else{      
      let client_id:string = clientId ? clientId : this.clientNameAutocomplete.getsearchListId(this.invoiceData.client_name);
      this.clientNameSelected = true;
      this.setNewClient(client_id);
    }

  }

  public clearclientAutocomplete():void {
    this.client_gstin = "";
    this.invoiceData.client_name = "";
    this.invoiceData.client_id = "";
    this.clientNameSelected = false;
    this.client_gsttreatment = "";
    this.setDefaults();
  }

  public checkAutoComplete(invoiceData, client:any, client_id:string, client_name:string):InvoiceData {
    if (client === undefined || invoiceData[client_id] === "") {
      invoiceData[client_id] = "";
      invoiceData["client_id"] = "";
    } else if (invoiceData[client_id] !== client[client_name]) {
      invoiceData[client_id] = client[client_name];
    }
    return invoiceData
  }

  /**
   * @description show alert
   * @param message message to be shown on alert 
   * @returns void
   */
  protected showAlert(message: string = "Operation successfully."): void {
    let that = this;
    swal({
      title: "Client is in SEZ",
      text: message,
      type: "warning",
      showCancelButton: false,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "Proceed",
      buttonsStyling: false
    }).then(function() {
      // that.clearclientAutocomplete();
      console.log("Acknowledged");
      
    });
  }
}