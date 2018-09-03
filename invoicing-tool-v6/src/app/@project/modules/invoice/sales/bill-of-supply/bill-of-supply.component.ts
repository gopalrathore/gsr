import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-bill-of-supply',
  templateUrl: './bill-of-supply.component.html',
  styleUrls: ['./bill-of-supply.component.css']
})
export class BillOfSupplyComponent extends createSalesInvoice implements OnInit {

  constructor(public companyServiceService: CompanyServiceService) {
    super(companyServiceService, 'BOS');
  }

  ngOnInit() {

    this.getTncandDeclaration();
    this.invoiceData['bank_id'] = "1"
    $('.switch').bootstrapSwitch({
      onColor: 'primary',
      onText: 'Yes',
      offText: 'No'
    });
    $('[rel="tooltip"]').tooltip();
  }


  /**
   * @description Submit the invoice detail
   * @param isValid if invoice form is valid
   * @returns void
   */
  invoiceSubmit(isValid: boolean): void {
    if (isValid == true) {
      // this.getReverseCharge();
      super.invoiceSubmit(isValid);
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }

  itemSelected(item_name, index) {
    let defaultForItem = {
      item_tax_rate: '0.00',
      item_tax_rate_interstate: "0.00",
      item_tax_rate_intrastate: "0.00"
    }
    this.createInvoiceInventory.itemSelected(item_name, index, defaultForItem);
  }

  newItemAdded(itemId:string){
    let defaultForItem = {
      item_tax_rate: '0.00',
      item_tax_rate_interstate: "0.00",
      item_tax_rate_intrastate: "0.00"
    }
    this.createInvoiceInventory.newItemAdded(itemId, defaultForItem);
  }

  ngAfterViewInit() {
    this.validate.validations();
  }
}
