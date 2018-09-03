import { GraphsPrefrences } from './default-prefrences/default-dashboard-prefrences.ts/default-stats-prefrences';
import { InvoiceShortcuts } from './default-prefrences/default-dashboard-prefrences.ts/default-shortcuts-preferences';
import { Injectable } from '@angular/core';

import { InventoryPrefrences } from './default-prefrences/defalut-inventory-prefrences';
import { TutorialPrefrences } from './default-prefrences/default-tutorial-prefrences';
import { CustomFieldPrefrence, InvoicePrefrence } from './default-prefrences/invoice-prefrences/invoice-prefrences';
// import { InvoiceShortcuts, GraphsPrefrences } from './default-prefrences/default-dshboard-prefrences.ts/dashboard-prefrences';

declare interface MyInvoicePrefrence{
  customFieldPrefrence:CustomFieldPrefrence;
  invoicePrefrence:InvoicePrefrence;
}

declare interface MyDashboardPrefrences{
  invoiceShortcuts: InvoiceShortcuts;
  graphsPrefrences: GraphsPrefrences;
}

declare interface MyPrefrences{
  tutorialPrefrences:TutorialPrefrences;
  inventoryPrefrences:InventoryPrefrences;
  myInvoicePrefrence:MyInvoicePrefrence;
  myDashboardPrefrences: MyDashboardPrefrences;
}

@Injectable()

export class PrefrencesService {

  myPrefrences: MyPrefrences = {
    tutorialPrefrences: new TutorialPrefrences(),
    inventoryPrefrences: new InventoryPrefrences(),
    myInvoicePrefrence:{
      customFieldPrefrence: new CustomFieldPrefrence(),
      invoicePrefrence: new InvoicePrefrence()
    },
    myDashboardPrefrences:{
      invoiceShortcuts: new InvoiceShortcuts(),
      graphsPrefrences: new GraphsPrefrences()
    }
  }

  constructor() {}

  resetAll(){
    this.myPrefrences.tutorialPrefrences.guidanceStatus();
    this.myPrefrences.inventoryPrefrences.inventoryAvailableStatus();
    this.myPrefrences.myInvoicePrefrence.invoicePrefrence.invoiceAvailableStatus();
  }

  setPrefrences(data: object){
    this.myPrefrences.myInvoicePrefrence.customFieldPrefrence.setCustomFields(data['custom_fields']);
  }

  sync(){
    this.myPrefrences.myInvoicePrefrence.customFieldPrefrence.sync();
  }

}