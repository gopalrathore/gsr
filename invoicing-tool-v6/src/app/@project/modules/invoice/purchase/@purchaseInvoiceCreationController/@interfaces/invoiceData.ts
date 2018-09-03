import { InvoiceItem } from './invoiceItems';

// variable commenting and classification
export interface InvoiceData {
  purchase_date: Date,
  reverse_charge: string,
  vendor_shipping_country: string,
  purchase_order_number: string,
  reference_number: string,
  purchase_order_date: Date | string,
  purchase_items: InvoiceItem[],
  same_as_billing: string,
  interstate:boolean,
  invoice_note: string,
  itc_eligibility: string,
  itc_amount: string,
  tds: string,
  vendor_state_code:string,
  vendor_name:string,
  vendor_shipping_address:string,
  vendor_shipping_address_2:string,
  vendor_shipping_address_3:string,
  vendor_shipping_address_4:string,
  vendor_shipping_state_code:string,
  vendor_shipping_state_name:string,
  vendor_id?:string,
  payment_due_days:string,
  declaration: string,
  tnc: string,
  purchase_number:string,
  custom_fields:string,
  transport_mode:string,
  transporter_name:string,
  transport_source: string,
  transport_destination: string,
  vehicle_number: string,
  lr_number: string
}