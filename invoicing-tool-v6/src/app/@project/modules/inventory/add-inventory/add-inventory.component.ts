import { HelperFunction } from '../../../../@core/utility-functions/utility-function';
import { StatusCodes } from '../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { Notification } from '../../../../@core/utility-functions/utility-function';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { Inventory } from './inventory';



@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})


export class AddInventoryComponent extends Inventory{

  public componentName:string = "Add Item";
  

  constructor(
    protected companyServiceService:CompanyServiceService,
    protected router : Router
  ) {
    super(companyServiceService, router);
  }

  ngAfterViewInit(){  
    this.validate.validations();
    this.selectRate();

    console.log(HelperFunction.totalInWords('12.35'));
  }

  /**
   * @description submit item to database
   * @param isValid true if form valid
   * @returns void
   */
  public productSubmit(isValid:boolean):void{
    if(this.product.item_hsn_code === ""){
      delete this.product['item_hsn_code'];
    }
    if(this.product.item_type === 'S'){
      delete this.product.item_unit_primary_actual;
      delete this.product.item_unit_primary_display;
      delete this.product.item_unit_secondary_actual;
      delete this.product.item_unit_secondary_display;
      delete this.product.primary_secondary_conversion_factor;
    }

    if(isValid && this.putCallable){
      this.putCallable = false;
      if(this.product.item_taxation_category === 'E'){
        this.product.item_tax_rate_interstate = "0.00";
        this.product.item_tax_rate_intrastate = "0.00";
      }
      AsyncApiCall.put('inventory',this.product).subscribe(resp=>{
        this.putCallable = true;
        if(resp.statusCode === StatusCodes.codes.CREATED){
          this.showAlert("Inventory has been added successfully.");
        } else if(!this.putCallable){
          console.warn("addInventory: waiting for api response.");
        }else {
          Notification.error(resp.message);
        }
      });
    }else if(!this.putCallable){
      console.warn("addInventory: waiting for api response.");
    }else{
      Notification.error('Please fill all required Fields!');
    }
  }
}
