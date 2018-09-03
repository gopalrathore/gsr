import { TaxRates } from '../../../../@core/dataset/tax-rate/tax-rates';
import { Router } from '@angular/router';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';

import { conversionTable } from '../../../../@core/dataset/conversion-table';
import { validations } from '../../../../@core/utility-functions/utility-function';
import { InventoryDataset } from '../../../../@core/dataset/dataset';

declare var $: any;
declare var swal: any;

export class Inventory {

  protected item_interstate: number[] = new TaxRates().getTaxRates('item_interstate');

  protected item_intrastate: number[] = new TaxRates().getTaxRates('item_intrastate');

  public enableAdjustment: boolean = false;

  private dataSet = new InventoryDataset();
  
  protected conversionTable: any = this.dataSet.conversionTable;

  public stockReason = this.dataSet.stockReason;

  public UQM = this.dataSet.UQM;

  public patchCallable: boolean = true;

  public putCallable: boolean = true;

  public product: any = {
    item_type: 'G',
    item_tax_rate_interstate: "12.00",
    item_tax_rate_intrastate: "12.00",
    item_taxation_category: 'T',
    item_tax_rate: "0.00",
    item_hsn_code: "",
    item_selling_rate: 0.00,
    item_purchasing_rate: 0.00,
    primary_secondary_conversion_factor: 1,
    item_opening_stock: 0.00,
    item_unit_secondary_actual: '',
    item_unit_primary_actual: ''
  };

  protected validate = new validations(this.product);

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected router: Router
  ) { }

  /**
   * @description select default rate
   * @returns void
   */
  public selectRate(): void {
    if (this.product.item_type === 'G') {
      this.product.item_tax_rate_interstate = "12.00";
      this.product.item_tax_rate_intrastate = "12.00";
    } else {
      this.product.item_tax_rate_interstate = "18.00";
      this.product.item_tax_rate_intrastate = "18.00";
    }

  }

  /**
   * @description set UQM conversion of products
   * @returns void
   */
  protected uqmConversion(): void {
    try {
      let index = this.conversionTable[this.product.item_unit_primary_actual]['match'].indexOf(this.product.item_unit_secondary_actual);
      this.product.primary_secondary_conversion_factor = this.conversionTable[this.product.item_unit_primary_actual]['factor'][index];
      if (this.product.primary_secondary_conversion_factor == undefined)
        this.product.primary_secondary_conversion_factor = 1.000000;
    }

    catch (Error) {
      console.log("error");
      this.product.primary_secondary_conversion_factor = 1.000000;
    }

  }


  protected showAlert(test: string = "Operation successfully."): void {
    let that = this;
    swal({
      title: 'Success',
      text: test,
      type: 'success',
      showCancelButton: false,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Proceed',
      buttonsStyling: false
    }).then(function () {
      that.router.navigateByUrl('inventory');
    });
  }

}