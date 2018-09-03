import { InvoiceItem } from './invoiceItems';

// variable commenting and classification
export interface InvoiceData {
    transaction_detail_mode: string;
    client_id: string;
    invoice_note: string;
    customer_note?: string;
    shipping_bill_date?:Date;
    shipping_bill_number?: string;
    port_code?: string;
    foreign_currency?: string;
    export_country?: string;
    bond_reference_number?:string;
    sales_person?: string;
    sales_order_number?: string;
    org_invoice_type?:string;
    org_doc_number?:string;
    reason_of_issue?:string;
    payment_due_days: string|number;
    org_doc_date: Date|string;
    org_invoice_id: string;
    extra_label: string;
    transporter_name:string;
    transport_source:string;
    transport_destination:string;
    vehicle_number:string;
    lr_number:string;
    already_paid: string|number;
    sez_supply: string;
    export_with_igst_payment: string;
    exchange_rate: string;
    reverse_charge:string;
    invoice_items: InvoiceItem[];
    interstate: boolean,
    freight: string,
    insurance: string,
    pack_n_frwd: string,
    ope: string,
    extra_value: string,
    same_as_billing: string,
    invoice_type: string,
    transport_mode: string,
    client_state_code: string,
    client_shipping_country: string,
    declaration:string,
    tnc:string,
    invoice_date:Date,
    invoice_number:string,
    custom_fields:any,
    client_shipping_address:string,
    client_shipping_address_2:string,
    client_shipping_address_3:string,
    client_shipping_address_4:string,
    client_shipping_state_code:string,
    client_shipping_state_name:string,
    client_name:string,
  
  }