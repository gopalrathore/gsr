import { TaxRates } from '../../../../../@core/dataset/dataset';
import { CreateInvoiceInvoiceNumber } from './@helperResourceDrivers/create-invoice-invoice-number';
import { CountryList } from '../../../../../@core/dataset/country/country-list';
import { CreateInvoiceCaluculator } from './@helperCalculator/create-invoice-calculator';
import { CreateInvoiceInventory } from './@helperResourceDrivers/create-invoice-inventory';
import { CreateInvoiceClient } from './@helperResourceDrivers/create-invoice-client';

import { validations } from '../../../../../@core/utility-functions/utility-function';
import { StateList } from '../../../../../@core/dataset/dataset';

import { InvoiceData } from './@interfaces/salesInvoiceInterfaces';



export class SalesInvoice {

  protected client_gsttreatment:string = "";

  protected taxRate:number[] = new TaxRates().getTaxRates();
  protected billing_address:any = {};
  public contact_person:any[] = [];
  protected client_gstin:string;
  public invoice_id:string = "";
  protected client_email:string;
  protected clientNameSelected: boolean = false;
  public editmode:boolean = false;
  protected addInventoryIndex: number = null;
  
  public invoiceData:InvoiceData;

  public putCallable: boolean = true;

  public custom_fields:object;

  public mailData: any = {
    company_name: "",
    invoice_type: "",
    change_invoice_number: ""
  };

  public state = new StateList();

  public countries = new CountryList();

  public createInvoiceCaluculator: CreateInvoiceCaluculator;
  public createInvoiceClient: CreateInvoiceClient;
  public createInvoiceInventory: CreateInvoiceInventory
  public createInvoiceInvoiceNumber: CreateInvoiceInvoiceNumber;
  protected validate: validations;

  constructor(protected companyServiceService, protected invoice_type:string){    
    this.setDefaults();
    this.getCustomFields();
    
    this.createInvoiceCaluculator = new CreateInvoiceCaluculator(this.invoiceData);
    this.createInvoiceClient = new CreateInvoiceClient(this.invoiceData, this.companyServiceService, this.createInvoiceCaluculator);
    this.createInvoiceInventory = new CreateInvoiceInventory(this.invoiceData, this.companyServiceService, this.createInvoiceCaluculator);
    this.createInvoiceInvoiceNumber = new CreateInvoiceInvoiceNumber(this.invoiceData);
    this.validate = new validations(this.invoiceData);
  }



  getCustomFields(){
    this.custom_fields = JSON.parse(
      JSON.stringify(
        this.companyServiceService.allPrefences.myPrefrences.myInvoicePrefrence.customFieldPrefrence.getCustomFields()
      ));
      console.log("get custom fileds called", this.custom_fields);
      
  }

  setDefaults(){
    this.companyServiceService.allPrefences.sync();
    this.invoiceData = {
      transaction_detail_mode: '',
      payment_due_days: '',
      org_invoice_id: '',
      org_doc_date: new Date(),
      transporter_name:'',
      transport_source:'',
      transport_destination:'',
      vehicle_number:'',
      client_id: '',
      lr_number: '',
      extra_label: '',
      declaration: '',
      tnc: '',
      invoice_note: '',
      invoice_date: new Date(),
      invoice_number: '',
      custom_fields: '',
      client_shipping_address: '',
      client_shipping_address_2: '',
      client_shipping_address_3: '',
      client_shipping_address_4: '',
      client_shipping_state_code: '',
      client_shipping_state_name: '',
      client_name: '',
      already_paid: '0',
      sez_supply: '0',
      export_with_igst_payment: '0',
      exchange_rate: '0',
      reverse_charge: '0',
      invoice_items: [{
        item_type: '',
        item_hsn_code:'',
        item_unit: '',
        item_unit_last: '',
        item_unit_primary_actual: '',
        item_unit_primary_display: '',
        item_unit_secondary_actual: '',
        item_unit_secondary_display: '',
        item_actual_rate: '',
        item_name: '',
        item_discount: '0',
        item_qty: '1',
        item_tax_rate: '0',
        item_rate: '0',
        item_taxation_category: "T",
        primary_secondary_conversion_factor: '1',
        item_taxed_total: '0',
        item_taxable_total: '0',
        cgst: '0',
        sgst: '0',
        igst: '0',
        cess: '0',
        item_tax_rate_intrastate: ''
      }],
      interstate: true,
      freight: '0',
      insurance: '0',
      pack_n_frwd: '0',
      ope: '0',
      extra_value: '0',
      same_as_billing: 'true',
      invoice_type: this.invoice_type,
      transport_mode: "",
      client_state_code: "",
      client_shipping_country: ""
    }
    
  }


}