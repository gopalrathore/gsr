
import { CountryList } from '../../../../../@core/dataset/country/country-list';
import { CreateInvoiceCaluculator } from './@helperCalculator/create-invoice-calculator';
import { CreateInvoiceInventory } from './@helperResourceDrivers/create-invoice-inventory';
import { CreateInvoiceVendor } from './@helperResourceDrivers/create-invoice-vendor';

import { validations } from '../../../../../@core/utility-functions/utility-function';
import { StateList, TaxRates } from '../../../../../@core/dataset/dataset';

import { InvoiceItem, InvoiceData } from './@interfaces/purchaseInvoiceInterfaces';



export class PurchaseInvoice {

  protected taxRate:number[] = new TaxRates().getTaxRates();
  protected billing_address:any = {};
  public contact_person:any[] = [];
  protected vendor_gstin:string;
  public invoice_id:string = "";
  protected vendor_email:string;
  protected vendorNameSelected: boolean = false;
  public editmode:boolean = false;
  protected addInventoryIndex: number = null;
  
  public purchaseData:InvoiceData;

  public custom_fields:object;

  public mailData: any = {
    company_name: "",
    invoice_type: "PI",
    change_invoice_number: ""
  };

  public state = new StateList();

  public countries = new CountryList();

  public createInvoiceCaluculator: CreateInvoiceCaluculator;
  public createInvoiceVendor: CreateInvoiceVendor;
  public createInvoiceInventory: CreateInvoiceInventory
  protected validate: validations;

  constructor(protected companyServiceService){    
    this.setDefaults();
    this.getCustomFields();
    
    this.createInvoiceCaluculator = new CreateInvoiceCaluculator(this.purchaseData);
    this.createInvoiceVendor = new CreateInvoiceVendor(this.purchaseData, this.companyServiceService, this.createInvoiceCaluculator);
    this.createInvoiceInventory = new CreateInvoiceInventory(this.purchaseData, this.companyServiceService, this.createInvoiceCaluculator);
    this.validate = new validations(this.purchaseData);
  }

  getCustomFields(){
    this.custom_fields = JSON.parse(
      JSON.stringify(
        this.companyServiceService.allPrefences.myPrefrences.myInvoicePrefrence.customFieldPrefrence.getCustomFields()
      ))
  }

  setDefaults(){
    this.companyServiceService.allPrefences.sync();
    this.purchaseData = {
      payment_due_days: '0',    
      purchase_order_number: '',
      reference_number: '',
      invoice_note: '',
      itc_eligibility: '1',
      itc_amount: '0',
      tds: '',
      vendor_id: '',     
      declaration: '',
      tnc: '',
      purchase_date: new Date(),
      purchase_number: '',
      custom_fields: '',
      vendor_shipping_address: '',
      vendor_shipping_address_2: '',
      vendor_shipping_address_3: '',
      vendor_shipping_address_4: '',
      vendor_shipping_state_code: '',
      vendor_shipping_state_name: '',
      vendor_name: '',     
      reverse_charge: '0',
      purchase_items: [{
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
      same_as_billing: 'true',
      vendor_state_code: "",
      vendor_shipping_country: "",
      purchase_order_date: '',
      transport_mode:'',
      transporter_name:'',
      transport_source: '',
      transport_destination: '',
      vehicle_number: '',
      lr_number: ''
    }
  }
}