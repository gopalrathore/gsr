import { HelperFunction } from './../../../../../@core/utility-functions/functions/helper-function';
import { Template1 } from './template-1/template-1.module';
export class Templates {

  private invoiceData:any = {
    "account_number": "",
    "account_type": "",
    "already_paid": "0",
    "bank_id": "",
    "bank_name": "",
    "branch_name": "",
    "client_address": "R12/6B, NEW NAVY NAGAR,  COLABA",
    "client_address_2": "MUMBAI",
    "client_address_3": "MUMBAI",
    "client_address_4": "400005",
    "client_address_5": "",
    "client_address_6": "",
    "client_code": "",
    "client_company": "GSR-nation",
    "client_company_nickname": "GSR-nation",
    "client_country": "India",
    "client_gst_id": "27AVYPL5122C1ZB",
    "client_id": "82",
    "client_note": "",
    "client_pan": "AVYPL5122C",
    "client_primary_contact_department": "",
    "client_primary_contact_designation": "",
    "client_primary_contact_email": "gopalrathore94@gmail.com",
    "client_primary_contact_first_name": "",
    "client_primary_contact_last_name": "",
    "client_primary_contact_middle_name": "",
    "client_primary_contact_mobile": "",
    "client_primary_contact_salutation": "",
    "client_primary_contact_website": "",
    "client_primary_contact_work_number": "",
    "client_registered": "1",
    "client_shipping_address": "R 30/1B, New Navy Nagar, Colaba",
    "client_shipping_address_2": "Colaba",
    "client_shipping_address_3": "Mumbai",
    "client_shipping_address_4": "400005",
    "client_shipping_address_5": "",
    "client_shipping_address_6": "",
    "client_shipping_country": "India",
    "client_shipping_state_code": "27",
    "client_shipping_state_name": "",
    "client_state_code": "27",
    "client_state_name": "",
    "company_address": "",
    "company_address_2": "",
    "company_address_3": "",
    "company_address_4": "",
    "company_address_5": "",
    "company_address_6": "",
    "company_composition": "0",
    "company_country": "India",
    "company_description": "",
    "company_email": "sfartech@gmail.com",
    "company_gst_id": "27ACYPL1392C1ZB",
    "company_gst_registration_type": "N",
    "company_id": "54",
    "company_identification_number": "",
    "company_industry": "",
    "company_logo": "",
    "company_name": "sfar tech",
    "company_number": "",
    "company_pan": "ACYPL1392C",
    "company_registered": "1",
    "company_sign": "",
    "company_state_code": "27",
    "company_state_name": "",
    "company_tan": "",
    "company_website": "",
    "custom_fields": "[{\\\"label\":\"\",\"value\":\"\"},{\"label\":\"\",\"value\":\"\"},{\"label\":\"\",\"value\":\"\"},{\"label\":\"\",\"value\":\"\"}]",
    "declaration": "sdfghjkl",
    "deleted_ts": "",
    "extra_charges": "0.00",
    "extra_label": "Other Charges",
    "extra_value": "0.00",
    "freight": "0.00",
    "ifsc": "",
    "inserted_ts": "2018-07-30 18:28:38",
    "insurance": "0.00",
    "invoice_date": "2018-07-30",
    "invoice_id": "145",
    "invoice_items": [
        {
            "company_id": null,
            "conversion_factor": "1.00",
            "deleted_ts": null,
            "id": "161",
            "inserted_ts": "2018-07-30 18:11:46",
            "invoice_id": "143",
            "item_desc": "",
            "item_discount": "0.00",
            "item_gross_value": "2240.00",
            "item_gross_value_with_extra_charge": "2296.00",
            "item_hsn_code": "",
            "item_id": "35",
            "item_name": "television",
            "item_net_value": "2000.00",
            "item_net_value_with_extra_charge": "2050.00",
            "item_qty": "1.00",
            "item_rate": "2000.00",
            "item_tax_rate": "12.00",
            "item_taxation_category": "T",
            "item_total": "2000.00",
            "item_type": "G",
            "item_unit_actual": "CTN-CARTONS",
            "item_unit_display": "carton",
            "item_weighted_extra_charge": "50.00",
            "item_weighted_extra_tax": "6.00",
            "stock_name": null,
            "updated_ts": null
        }
    ],
    "invoice_number": "INV00004",
    "invoice_taxable_total": "2000.00",
    "invoice_total": "2240.00",
    "invoice_type": "TI",
    "lr_number": "",
    "ope": "0.00",
    "pack_n_frwd": "0.00",
    "payment_due_days": "0",
    "reverse_charge": "0",
    "sales_order_number": "",
    "sales_person": "",
    "status": "1",
    "tax_on_extra_charges": "0.00",
    "template_id": "",
    "tnc": "1. my first terms and condition",
    "transaction_detail_mode": "",
    "transaction_detail_mode_other": "",
    "transport_destination": "",
    "transport_mode": "",
    "transport_source": "",
    "transporter_name": "",
    "updated_ts": "",
    "user_id": "0",
    "vehicle_number": ""
}

  private invoiceData2:any = {
    "invoice_id": "143",
    "company_id": "54",
    "client_id": "82",
    "template_id": "",
    "user_id": "0",
    "bank_id": "",
    "invoice_number": "INV00002",
    "freight": "10.00",
    "insurance": "10.00",
    "pack_n_frwd": "10.00",
    "ope": "10.00",
    "extra_label": "extra",
    "extra_value": "10.00",
    "extra_charges": "50.00",
    "invoice_date": "2018-07-30",
    "payment_due_days": "0",
    "transport_mode": "",
    "transport_source": "",
    "transport_destination": "",
    "transporter_name": "",
    "vehicle_number": "",
    "lr_number": "",
    "reverse_charge": "0",
    "custom_fields": "[{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"}]",
    "tnc": "dfgdgh",
    "declaration": "dfhdfg",
    "sales_order_number": "",
    "sales_person": "",
    "invoice_type": "TI",
    "already_paid": "0",
    "transaction_detail_mode": "",
    "transaction_detail_mode_other": "",
    "client_code": "",
    "client_company": "GSR-nation",
    "client_company_nickname": "GSR-nation",
    "client_primary_contact_salutation": "",
    "client_primary_contact_first_name": "",
    "client_primary_contact_middle_name": "",
    "client_primary_contact_last_name": "",
    "client_primary_contact_mobile": "",
    "client_primary_contact_work_number": "",
    "client_primary_contact_department": "",
    "client_primary_contact_designation": "",
    "client_primary_contact_email": "gopalrathore94@gmail.com",
    "client_primary_contact_website": "",
    "client_address": "R12/6B, NEW NAVY NAGAR,  COLABA",
    "client_address_2": "MUMBAI",
    "client_address_3": "MUMBAI",
    "client_address_4": "400005",
    "client_address_5": "",
    "client_address_6": "",
    "client_state_code": "27",
    "client_state_name": "",
    "client_country": "India",
    "client_registered": "1",
    "client_gst_id": "27AVYPL5122C1ZB",
    "client_pan": "AVYPL5122C",
    "client_shipping_address": "R 30/1B, New Navy Nagar, Colaba",
    "client_shipping_address_2": "Colaba",
    "client_shipping_address_3": "Mumbai",
    "client_shipping_address_4": "400005",
    "client_shipping_address_5": "",
    "client_shipping_address_6": "",
    "client_shipping_state_code": "27",
    "client_shipping_state_name": "",
    "client_shipping_country": "India",
    "client_note": "",
    "company_name": "sfar tech",
    "company_registered": "1",
    "company_gst_id": "27ACYPL1392C1ZB",
    "company_pan": "ACYPL1392C",
    "company_tan": "",
    "company_industry": "",
    "company_address": "",
    "company_address_2": "",
    "company_address_3": "",
    "company_address_4": "",
    "company_address_5": "",
    "company_address_6": "",
    "company_state_code": "27",
    "company_state_name": "",
    "company_country": "India",
    "company_identification_number": "",
    "company_description": "",
    "company_composition": "0",
    "company_gst_registration_type": "N",
    "company_website": "",
    "company_email": "sfartech@gmail.com",
    "company_number": "",
    "company_logo": "",
    "company_sign": "",
    "bank_name": "",
    "branch_name": "",
    "account_number": "",
    "ifsc": "",
    "account_type": "",
    "tax_on_extra_charges": "6.00",
    "invoice_total": "2296.00",
    "invoice_taxable_total": "2050.00",
    "status": "1",
    "inserted_ts": "2018-07-30 18:11:46",
    "updated_ts": "",
    "deleted_ts": "",
    "invoice_items": [
      {
        "id": "161",
        "invoice_id": "143",
        "item_id": "35",
        "company_id": null,
        "item_name": "television",
        "item_desc": "",
        "item_hsn_code": "",
        "stock_name": null,
        "item_rate": "2000.00",
        "item_taxation_category": "T",
        "item_tax_rate": "12.00",
        "item_discount": "0.00",
        "item_qty": "1.00",
        "item_unit_actual": "CTN-CARTONS",
        "item_unit_display": "carton",
        "conversion_factor": "1.00",
        "item_type": "G",
        "item_total": "2000.00",
        "item_net_value": "2000.00",
        "item_gross_value": "2240.00",
        "item_weighted_extra_charge": "50.00",
        "item_weighted_extra_tax": "6.00",
        "item_net_value_with_extra_charge": "2050.00",
        "item_gross_value_with_extra_charge": "2296.00",
        "inserted_ts": "2018-07-30 18:11:46",
        "updated_ts": null,
        "deleted_ts": null
      }
    ]
  };

  constructor(private selectedTemplate){ }

  sanatizeData(){
    for (const key in this.invoiceData) {
      if(this.invoiceData[key]===null){
        this.invoiceData[key] = "";
      }
    }
  }

  getPdfData(pdfSetting, invoiceData?){
    if(invoiceData){
      this.invoiceData = invoiceData
    }

    this.sanatizeData();
    this.sanatizePdfSetting({...pdfSetting});

    pdfSetting = this.sanatizePdfSetting({...pdfSetting});

    
    this.invoiceData.pdfSetting = pdfSetting;
    
    
    switch (this.selectedTemplate) {
      case 1:
        let template1 = new Template1(this.invoiceData);
        return template1.getPdfData(pdfSetting);  
      default:
        return {};
    }
  }

  private sanatizePdfSetting(pdfSetting:any){
    let signBase64 = localStorage.getItem('sign');
    let logoBase64 = localStorage.getItem('logo');
    if(signBase64 && signBase64 != ''){
      pdfSetting.sign = signBase64;
    }

    if(logoBase64 && logoBase64 != ''){
      pdfSetting.logo = logoBase64;
    }

    return {...pdfSetting};
  }


  
}