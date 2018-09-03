import { TaxRates } from '../../../../../../@core/dataset/tax-rate/tax-rates';
import { InvoiceData } from '../@interfaces/salesInvoiceInterfaces';

interface Totals {
  UnTaxedTotal: number;
  eCtaxTotal: number;
  taxedTotal: number;
  finalTotal: number;
  totalEC: any;
}

export class CreateInvoiceCaluculator {

  constructor(private invoiceData: InvoiceData) {

  }

  public taxRate: number[] = new TaxRates().getTaxRates();

  public totals: Totals = {
    UnTaxedTotal: 0,
    eCtaxTotal: 0,
    taxedTotal: 0,
    finalTotal: 0,
    totalEC: '0'
  }

  protected totalsDefaults: Totals = {
    UnTaxedTotal: 0,
    eCtaxTotal: 0,
    taxedTotal: 0,
    finalTotal: 0,
    totalEC: '0'
  }

  protected toNumber(unknownType: any): number {
    return isNaN(unknownType) ? 0 : Number(unknownType);
  }

  private setToDefault(): void {
    this.totals = JSON.parse(JSON.stringify(this.totalsDefaults));
  }

  private calculateTotal(quantity: string | number, rate: string | number, discount: string | number = 0, tax: string | number = 0): number {
    quantity = this.toNumber(quantity);
    rate = this.toNumber(rate);
    discount = this.toNumber(discount);
    tax = this.toNumber(tax);
    return quantity * rate * (1 - discount / 100) * (1 + tax / 100);
  }

  private calculateTax(quantity: string | number, rate: string | number, discount: string | number = 0, tax: string | number = 0): number {
    quantity = this.toNumber(quantity);
    rate = this.toNumber(rate);
    discount = this.toNumber(discount);
    tax = this.toNumber(tax);
    return quantity * rate * (1 - discount / 100) * (tax / 100);
  }

  public calculator(): void {
    let invoiceData: InvoiceData = this.invoiceData;
    this.setToDefault()
    this.totals.totalEC = (
      this.toNumber(invoiceData.freight) +
      this.toNumber(invoiceData.insurance) +
      this.toNumber(invoiceData.pack_n_frwd) +
      this.toNumber(invoiceData.ope) +
      this.toNumber(invoiceData.extra_value)
    ).toFixed(2);

    invoiceData.invoice_items.map((item, i) => {
      if (item.item_unit_last != item.item_unit) {

        let conversion_factor = item.item_unit == item.item_unit_primary_actual ? item.primary_secondary_conversion_factor : 1 / this.toNumber(item.primary_secondary_conversion_factor);
        invoiceData.invoice_items[i]["item_rate"] = (this.toNumber(conversion_factor) * this.toNumber(item.item_rate)).toFixed(2);
        invoiceData.invoice_items[i]["item_unit_last"] = item.item_unit;
      }
      invoiceData.invoice_items[i]["item_taxable_total"] = this.calculateTotal(item["item_qty"], item["item_rate"], item["item_discount"]).toString();
      invoiceData.invoice_items[i]["item_taxed_total"] = this.calculateTotal(item["item_qty"], item["item_rate"], item["item_discount"], item["item_tax_rate"]).toFixed(2);
    });

    invoiceData.invoice_items.map((item, i) => {
      this.totals.UnTaxedTotal += this.calculateTotal(item["item_qty"], item["item_rate"], item["item_discount"]);
      this.totals.taxedTotal += this.calculateTotal(item["item_qty"], item["item_rate"], item["item_discount"], item["item_tax_rate"]);
    });

    invoiceData.invoice_items.map((item, i) => {
      let weighted_ec = this.toNumber(this.totals.totalEC) * (this.calculateTotal(item["item_qty"], item["item_rate"], item["item_discount"]) / this.totals.UnTaxedTotal);//
      let weighted_ect = weighted_ec * (1 + this.toNumber(item["item_tax_rate"]) / 100);
      this.totals.eCtaxTotal += weighted_ect;
    });

    this.totals.finalTotal = this.totals.taxedTotal + this.totals.eCtaxTotal;

    invoiceData.invoice_items.map((item, i) => {
      invoiceData.invoice_items[i].cgst = '0';
      invoiceData.invoice_items[i].sgst = '0';
      invoiceData.invoice_items[i].igst = '0';

      if (!invoiceData.interstate)
        invoiceData.invoice_items[i].sgst = invoiceData.invoice_items[i].cgst = (this.calculateTax(item["item_qty"], item["item_rate"], item["item_discount"], item["item_tax_rate"]) / 2).toString();
      else
        invoiceData.invoice_items[i].igst = this.calculateTax(item["item_qty"], item["item_rate"], item["item_discount"], item["item_tax_rate"]).toString();

    });

    this.invoiceData = invoiceData;

  }


  public getRates(currentCompany: any, index?: number): void {

    let invoiceData: InvoiceData = this.invoiceData;

    invoiceData.interstate = invoiceData.client_state_code !== currentCompany.company_state_code;

    this.taxRate = new TaxRates().getTaxRates(invoiceData.interstate ? 'item_interstate' : 'item_intrastate');

    if (index !== undefined) {
      invoiceData.invoice_items[index].item_tax_rate = invoiceData.interstate ? invoiceData.invoice_items[index].item_tax_rate_interstate : invoiceData.invoice_items[index].item_tax_rate_intrastate;
    }
    else {
      invoiceData.invoice_items.map((item, i) => {
        item.item_tax_rate = invoiceData.interstate ? item.item_tax_rate_interstate : item.item_tax_rate_intrastate;
      });
    }

    this.invoiceData = invoiceData;
  }
}