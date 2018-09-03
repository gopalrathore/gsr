interface Tax {
  taxRates: number[],
  item_interstate: number[],
  item_intrastate: number[]
}

export class TaxRates {

  private allTaxRates: Tax = {
    taxRates: [0.0, 0.25, 3.0, 5.0, 12.0, 18.0, 28.0],
    item_interstate: [0.0, 0.25, 3.0, 5.0, 12.0, 18.0, 28.0],
    item_intrastate: [0.0, 0.25, 3.0, 5.0, 12.0, 18.0, 28.0]
  }

  getTaxRates(type: string = "taxRates"): number[] {
    return this.allTaxRates[type] !== undefined ? this.allTaxRates[type] : [];
  }

}