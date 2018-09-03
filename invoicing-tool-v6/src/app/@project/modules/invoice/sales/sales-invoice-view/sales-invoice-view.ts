import { Router } from '@angular/router';
import { TransfereService } from '../../../../../@core/services/transfer.service';
import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { StateList } from '../../../../../@core/dataset/state/state-list';
import { StatusCodes } from '../../../../../@core/dataset/status-code/codes';
import { HelperFunction } from '../../../../../@core/utility-functions/utility-function';
import { InvoiceDataResponse } from '../@salesInvoiceCreationController/@interfaces/invoice-data-response';

export class SalesInvoiceView {
  public invoiceData: InvoiceDataResponse = {
    "invoice_id": "",
    "company_id": "",
    "client_id": "",
    "template_id": "",
    "user_id": "",
    "bank_id": "",
    "invoice_number": "",
    "freight": "",
    "insurance": "",
    "pack_n_frwd": "",
    "ope": "",
    "extra_label": "",
    "extra_value": "",
    "extra_charges": "",
    "invoice_date": "",
    "payment_due_days": "",
    "transport_mode": "",
    "transport_source": "",
    "transport_destination": "",
    "transporter_name": "",
    "vehicle_number": "",
    "lr_number": "",
    "reverse_charge": "",
    "custom_fields": [],
    "client_name": "",
    "tnc": "",
    "declaration": "",
    "sales_order_number": "",
    "same_as_billing": "",
    "sales_person": "",
    "invoice_type": "",
    "already_paid": "",
    "transaction_detail_mode": "",
    "transaction_detail_mode_other": "",
    "client_code": "",
    "client_company": "",
    "client_company_nickname": "",
    "client_primary_contact_salutation": "",
    "client_primary_contact_first_name": "",
    "client_primary_contact_middle_name": "",
    "client_primary_contact_last_name": "",
    "client_primary_contact_mobile": "",
    "client_primary_contact_work_number": "",
    "client_primary_contact_department": "",
    "client_primary_contact_designation": "",
    "client_primary_contact_email": "",
    "client_primary_contact_website": "",
    "client_address": "",
    "client_address_2": "",
    "client_address_3": "",
    "client_address_4": "",
    "client_address_5": "",
    "client_address_6": "",
    "client_state_code": "",
    "client_state_name": "",
    "client_country": "",
    "client_registered": "",
    "client_gst_id": "",
    "client_pan": "",
    "client_shipping_address": "",
    "client_shipping_address_2": "",
    "client_shipping_address_3": "",
    "client_shipping_address_4": "",
    "client_shipping_address_5": "",
    "client_shipping_address_6": "",
    "client_shipping_state_code": "",
    "client_shipping_state_name": "",
    "client_shipping_country": "",
    "client_note": "",
    "company_name": "",
    "company_registered": "",
    "company_gst_id": "",
    "company_pan": "",
    "company_tan": "",
    "company_industry": "",
    "company_address": "",
    "company_address_2": "",
    "company_address_3": "",
    "company_address_4": "",
    "company_address_5": "",
    "company_address_6": "",
    "company_state_code": "",
    "company_state_name": "",
    "company_country": "",
    "company_identification_number": "",
    "company_description": "",
    "company_composition": "",
    "company_gst_registration_type": "",
    "company_website": "",
    "company_email": "",
    "company_number": "",
    "company_logo": "",
    "company_sign": "",
    "bank_name": "",
    "branch_name": "",
    "account_number": "",
    "ifsc": "",
    "account_type": "",
    "tax_on_extra_charges": "",
    "invoice_total": "",
    "invoice_taxable_total": "",
    "status": "",
    "inserted_ts": "",
    "updated_ts": "",
    "deleted_ts": "",
    "invoice_items": []
  };

  private state = new StateList();

  protected invoiceId = this.transfereService.getData();

  constructor(protected transfereService:TransfereService, protected router:Router){
    if (this.invoiceId) {
      this.getInvoiceData();
    }
    else {
      this.router.navigateByUrl('/invoice/sales');
    }

  }

  /**
   * @description Get invoice data
   * @returns void
   */
  getInvoiceData():void{
    AsyncApiCall.get('salesInvoice', {invoice_id: this.invoiceId}).subscribe(resp => {
      if(resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        this.invoiceData = resp.data[0];
        this.invoiceData.invoice_date = new Date(this.invoiceData.invoice_date);
        
        // this.invoiceData.custom_fields = JSON.parse(resp.data[0].custom_fields);
        
        if(this.invoiceData.client_country=='India'){
          let statename:string = this.state.getStateName(this.invoiceData.client_state_code);
          this.invoiceData.client_state_name = statename;
        }

        if(this.invoiceData.client_shipping_state_code && this.invoiceData.client_shipping_country=='India'){          
          this.invoiceData.client_shipping_state_name = this.state.getStateName(this.invoiceData.client_shipping_state_code);
        }        
        this.invoiceData['invoiceTotalInWords'] = HelperFunction.totalInWords(this.invoiceData.invoice_total);
        this.getItemTax();
      }      
    });
  }

  getItemTax(){
    if(this.invoiceData['company_state_code']!=this.invoiceData['client_state_code']){
      this.invoiceData.invoice_items.map((item, index)=>{
        this.invoiceData.invoice_items[index]['igst'] = (HelperFunction.toNumber(item.item_tax_rate)*(HelperFunction.toNumber(item.item_net_value)/100)).toFixed(2);
      });
    }else {
      this.invoiceData.invoice_items.map((item, index)=>{
        this.invoiceData.invoice_items[index]['cgst'] = this.invoiceData.invoice_items[index]['sgst'] = (HelperFunction.toNumber(item.item_tax_rate)*(HelperFunction.toNumber(item.item_net_value)/200)).toFixed(2);
      });
    }
  }
}