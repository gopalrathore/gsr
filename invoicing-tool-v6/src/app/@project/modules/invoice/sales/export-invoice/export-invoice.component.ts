import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { createSalesInvoice } from '../../create-sales-invoice';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';

import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-export-invoice',
  templateUrl: './export-invoice.component.html',
  styleUrls: ['./export-invoice.component.css']
})
export class ExportInvoiceComponent extends createSalesInvoice implements OnInit {

  constructor(public companyServiceService:CompanyServiceService) {
    super(companyServiceService, 'EI');
    this.invoiceData['already_paid'] = '0';
    this.invoiceData['reverse_charge'] = '0';
  }

  ngOnInit() {
    this.getTncandDeclaration();
    this.invoiceData['bank_id'] = "1";
   $('.switch').bootstrapSwitch({
    onColor:'primary',
    onText: 'Yes',
    offText: 'No'
   });
   $('[rel="tooltip"]').tooltip();
  }

  exportPayment():void{
    this.invoiceData.invoice_items.map((item,i)=>{
      if(this.invoiceData.export_with_igst_payment=='0')
        this.invoiceData.invoice_items[i].item_tax_rate = '0';
    });
  }

  invoiceSubmit(isValid:boolean):void{

    if(isValid==true){
      if(this.invoiceData.sez_supply=='1')
        // this.getReverseCharge();
        if(this.invoiceData.already_paid=='1'){
          this.invoiceData.payment_due_days = '0';
        }

        this.exportPayment();
        
      // this.invoiceData.export_country = this.invoiceData['foreign_currency'];
      super.invoiceSubmit(isValid);
    }else{
      Notification.error("Please fill all required Fields!");
    }
    
  }

  ngAfterViewInit(){
    this.validate.validations();
  }

  calculator():void{
    this.exportPayment();
    super.calculator();
  }


}
