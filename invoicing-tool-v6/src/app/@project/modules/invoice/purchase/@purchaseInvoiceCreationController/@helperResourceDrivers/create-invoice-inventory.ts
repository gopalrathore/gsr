import { StatusCodes } from '../../../../../../@core/dataset/status-code/codes';
import { AsyncApiCall } from '../../../../../../@core/services/async-api-call';
import { CompanyServiceService } from '../../../../../../@core/services/company-service.service';
import { AutoComplete } from '../../../../../../@core/services/Autocomplete';
import { SyncApiCall } from '../../../../../../@core/services/sync-api-call';

import { InvoiceData, InvoiceItem } from '../@interfaces/purchaseInvoiceInterfaces';
import { CreateInvoiceCaluculator } from '../@helperCalculator/create-invoice-calculator';

declare var $: any;

export class CreateInvoiceInventory {

  protected addInventoryIndex: number = null;
  
  public common_discount = '0';

  public newitem: InvoiceItem = {
    item_type: '',
    item_hsn_code:'',
    item_unit: '',
    item_unit_last: '',
    item_unit_primary_actual: '',
    item_unit_primary_display: '',
    item_unit_secondary_actual: '',
    item_unit_secondary_display: '',
    item_actual_rate: '',
    item_name: '',
    item_discount: '0',
    item_qty: '1',
    item_tax_rate: '0',
    item_rate: '0',
    item_taxation_category: "T",
    primary_secondary_conversion_factor: '1',
    item_taxed_total: '0',
    item_taxable_total: '0',
    cgst: '0',
    sgst: '0',
    igst: '0',
    cess: '0',
    item_tax_rate_intrastate: ''
  };

  public itemNameAutocomplete:AutoComplete = new AutoComplete();

  constructor(protected purchaseData:InvoiceData, protected companyServiceService:CompanyServiceService, protected createInvoiceCaluculator){
    this.itemNameAutocomplete.newAdd = true;
    this.itemNameAutocomplete.get_full_list("inventory","item_nick_name","item_id");
  }

  private setItem(index:number, item_id:string):void{
    let newItem: InvoiceItem = this.purchaseData.purchase_items[index];

    let data = {
      item_id: item_id
    };    

    AsyncApiCall.get('inventory', data).subscribe(resp => {

      if(resp.statusCode !== StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) return null;

    let item:any = resp.data[0];      

    newItem.item_hsn_code = item.item_hsn_code;

    newItem.item_unit = item.item_unit_primary_actual;
    newItem.item_unit_last = item.item_unit_primary_actual;

    newItem.item_unit_primary_actual = item.item_unit_primary_actual;
    newItem.item_unit_primary_display = item.item_unit_primary_display;
    newItem.item_unit_secondary_actual = item.item_unit_secondary_actual;
    newItem.item_unit_secondary_display = item.item_unit_secondary_display;
    newItem.primary_secondary_conversion_factor = item.primary_secondary_conversion_factor;
    newItem.item_rate = item.item_selling_rate;
    newItem.item_actual_rate = item.item_selling_rate;
    newItem.item_id = item.item_id;
    newItem.item_taxation_category = item.item_taxation_category;

    newItem.item_tax_rate_interstate = item.item_tax_rate_interstate;
    newItem.item_tax_rate_intrastate = item.item_tax_rate_intrastate;
    newItem.item_type = item.item_type;
    newItem.item_name = item.item_name;
    newItem.item_discount = this.common_discount.toString();    

    this.purchaseData.purchase_items[index] = newItem;
    console.log("item added", newItem ,this.purchaseData.purchase_items[index]);
    this.createInvoiceCaluculator.getRates(this.companyServiceService.getCompany(), index);
    this.createInvoiceCaluculator.calculator();
    
    });

  }

  public addMoreItem():void {
    this.purchaseData.purchase_items[this.purchaseData.purchase_items.length] = JSON.parse(JSON.stringify(this.newitem));
    this.purchaseData.purchase_items[this.purchaseData.purchase_items.length - 1]["item_discount"] = this.common_discount.toString();
  }

  public removeMoreItem(index:number):void {
    let t = JSON.parse(JSON.stringify(this.purchaseData.purchase_items));
    t.splice(index, 1);
    this.purchaseData.purchase_items = JSON.parse(JSON.stringify(t));
  }

  public newItemAdded(item_id:object):void {
    this.itemNameAutocomplete = new AutoComplete();
    this.itemNameAutocomplete.get_full_list("inventory", "item_name", "item_id");
    let i = this.addInventoryIndex;
    this.setItem(i, item_id['item_id']);
  }
  
  public itemSelected(value:string, index:number):void {
    if (value == "+ Add New") {
      this.purchaseData.purchase_items[index].item_name = "";
      this.addInventoryIndex = index;
      $(".newInventory").click();
    }else {
      let item_id = this.itemNameAutocomplete.getsearchListId(value);
      console.log("item id", item_id);
      this.setItem(index, item_id);
    }    
  }

  public setCommonDiscount():void {
    for (let i:number = 0; i < this.purchaseData.purchase_items.length; i++) {
      this.purchaseData.purchase_items[i].item_discount = this.common_discount;
    }
  }

}