
import { TaxRates } from '../../../../../../@core/dataset/tax-rate/tax-rates';
import { InvoiceData } from '../@interfaces/purchaseInvoiceInterfaces';

interface Totals{
  UnTaxedTotal:number;
  eCtaxTotal:number;
  taxedTotal:number;
  finalTotal:number;
  totalEC:string;
}

export class CreateInvoiceCaluculator {

  constructor(private purchaseData:InvoiceData){
    
  }

  public taxRate:number[] = new TaxRates().getTaxRates();

  public totals:Totals = {
    UnTaxedTotal:0,
    eCtaxTotal:0,
    taxedTotal:0,
    finalTotal:0,
    totalEC:'0'
  }

  protected totalsDefaults:Totals = {
    UnTaxedTotal:0,
    eCtaxTotal:0,
    taxedTotal:0,
    finalTotal:0,
    totalEC:'0'
  }

  protected toNumber(unknownType: any):number {
    return isNaN(unknownType) ? 0 : Number(unknownType);
  }

  private setToDefault(){
    this.totals = JSON.parse(JSON.stringify(this.totalsDefaults));
  }

  private calculateTotal(quantity:string|number, rate:string|number, discount:string|number = 0, tax:string|number = 0): number{
    quantity = this.toNumber(quantity);
    rate = this.toNumber(rate);
    discount = this.toNumber(discount);
    tax = this.toNumber(tax);
    return quantity * rate * (1 - discount / 100) * (1 + tax / 100);
  }

  private calculateTax(quantity:string|number, rate:string|number, discount:string|number = 0, tax:string|number = 0){
    quantity = this.toNumber(quantity);
    rate = this.toNumber(rate);
    discount = this.toNumber(discount);
    tax = this.toNumber(tax);
    return quantity * rate * (1 - discount / 100) * (tax / 100);
  }

  public calculator():void {    
    let purchaseData:InvoiceData = this.purchaseData;
    this.setToDefault()
    this.totals.totalEC = (0).toFixed(2);

    purchaseData.purchase_items.map((item, i) => {
      if (item.item_unit_last != item.item_unit) {
        let conversion_factor = item.item_unit == item.item_unit_primary_actual ? item.primary_secondary_conversion_factor : 1 / this.toNumber(item.primary_secondary_conversion_factor);
        purchaseData.purchase_items[i]["item_rate"] = (this.toNumber(conversion_factor) * this.toNumber(item.item_rate)).toFixed(2);
        purchaseData.purchase_items[i]["item_unit_last"] = item.item_unit;
      }
      purchaseData.purchase_items[i]["item_taxable_total"] = this.calculateTotal(item["item_qty"],item["item_rate"],item["item_discount"]).toString();
      purchaseData.purchase_items[i]["item_taxed_total"] = this.calculateTotal(item["item_qty"], item["item_rate"], item["item_discount"], item["item_tax_rate"]).toFixed(2);
    });

    purchaseData.purchase_items.map((item, i) => {      
      this.totals.UnTaxedTotal += this.calculateTotal(item["item_qty"],item["item_rate"],item["item_discount"]);
      this.totals.taxedTotal += this.calculateTotal(item["item_qty"], item["item_rate"], item["item_discount"], item["item_tax_rate"]);
    });

    purchaseData.purchase_items.map((item, i) => {
      let weighted_ec = this.toNumber(this.totals.totalEC) * (this.calculateTotal(item["item_qty"], item["item_rate"], item["item_discount"]) / this.totals.UnTaxedTotal);//
      let weighted_ect = weighted_ec * (1 + this.toNumber(item["item_tax_rate"]) / 100);
      this.totals.eCtaxTotal += weighted_ect;
    });

    this.totals.finalTotal = this.totals.taxedTotal + this.totals.eCtaxTotal;

    purchaseData.purchase_items.map((item, i) => {
      purchaseData.purchase_items[i].cgst = '0';
      purchaseData.purchase_items[i].sgst = '0';
      purchaseData.purchase_items[i].igst = '0';

      if (!purchaseData.interstate) 
        purchaseData.purchase_items[i].sgst = purchaseData.purchase_items[i].cgst = (this.calculateTax(item["item_qty"], item["item_rate"], item["item_discount"], item["item_tax_rate"])/2).toString();
      else 
        purchaseData.purchase_items[i].igst = this.calculateTax(item["item_qty"], item["item_rate"], item["item_discount"], item["item_tax_rate"]).toString();
      
    });

    this.purchaseData = purchaseData;
  }


  public getRates(currentCompany, index?: number):void {
    let vendor_state_code, company_state_code;
    let purchaseData:InvoiceData = this.purchaseData;

    vendor_state_code = purchaseData.vendor_state_code;
    company_state_code = currentCompany.company_state_code;

    if (vendor_state_code == company_state_code) {
      purchaseData.interstate = false;
      this.taxRate = new TaxRates().getTaxRates('item_intrastate');
      purchaseData.purchase_items.map((item, i) => {
        if (index != undefined) {
          if (i == index) {
            item.item_tax_rate = item.item_tax_rate_intrastate;
          }
        } else item.item_tax_rate = item.item_tax_rate_intrastate;
      });
    } else {
      purchaseData.interstate = true;
      this.taxRate = new TaxRates().getTaxRates('item_interstate');
      purchaseData.purchase_items.map((item, i) => {
        if (index != undefined) {
          if (i == index) {
            item.item_tax_rate = item.item_tax_rate_interstate;
          }
        } else item.item_tax_rate = item.item_tax_rate_interstate;
      });
    }

    this.purchaseData = purchaseData;
  }
}