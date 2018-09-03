import { StatusCodes } from '../../../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../../../@core/services/async-api-call';
import { NgForm } from '@angular/forms';
import { CompanyServiceService } from '../../../../../../@core/services/company-service.service';
import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';

import { conversionTable } from '../../../../../../@core/dataset/conversion-table'
import { validations,Notification } from '../../../../../../@core/utility-functions/utility-function';


declare var $:any;

@Component({
  selector: 'app-new-inventory',
  templateUrl: './new-inventory.component.html',
  styleUrls: ['./new-inventory.component.css']
})
export class NewInventoryComponent implements OnInit {

  @Output() newItemAdded = new EventEmitter();

  public putCallable:boolean = true;

  private conversionTable:any = conversionTable;

  public product:any = {
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

  protected validate1

  constructor(private companyServiceService:CompanyServiceService) { 
    this.validate1 = new validations(this.product,this.constructor.name);
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.validate1.validations();
    this.selectRate();
  }

  uqmConversion():void{
    try{
        let index = this.conversionTable[this.product.item_unit_primary_actual]['match'].indexOf(this.product.item_unit_secondary_actual);
        this.product.primary_secondary_conversion_factor = this.conversionTable[this.product.item_unit_primary_actual]['factor'][index];
        if(this.product.primary_secondary_conversion_factor==undefined)
                this.product.primary_secondary_conversion_factor = 1.000000;
    }
    catch(Error){
        this.product.primary_secondary_conversion_factor = 1;
    }
    
  }

  close(form:NgForm):void{    
    form.resetForm({
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
    });
    
    this.product = {
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
  }

  selectRate():void{
    
    if(this.product.item_type=='G'){
      this.product.item_tax_rate_interstate = "12.00";
      this.product.item_tax_rate_intrastate = "12.00";
    }else {
      this.product.item_tax_rate_interstate = "18.00";
      this.product.item_tax_rate_intrastate = "18.00";
    }    

  }

  productSubmit(form: NgForm, isValid:boolean):void{
    if(this.product.item_type=='S'){
      delete this.product.item_unit_primary_actual;
      delete this.product.item_unit_primary_display;
      delete this.product.item_unit_secondary_actual;
      delete this.product.item_unit_secondary_display;
      delete this.product.primary_secondary_conversion_factor;
    }   
    
    if(isValid && this.putCallable){
      this.putCallable = false;

      if(this.product.item_taxation_category=='E'){
        this.product.item_tax_rate_interstate = "0.00";
        this.product.item_tax_rate_intrastate = "0.00";
      }


      AsyncApiCall.put('inventory', this.product).subscribe(resp=>{  
        this.putCallable = true;      
        if(resp.statusCode==StatusCodes.codes.CREATED){  
          let newData = {
            item_id: resp.data[0].item_id
          }
          this.newItemAdded.emit(newData);
          this.product = {
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
          $('#newInventory').modal('hide');
          this.close(form);
          
        }else {
          Notification.error(resp.message);
        }
      });
    } else if(!this.putCallable) {
      console.log("new item adding : ", "Waiting for API response.");
    } else{
      Notification.error("Please fill all required Fields!");
    }
  }

}
