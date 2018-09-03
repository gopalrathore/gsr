import { Component, OnInit } from '@angular/core';
import { reportTable } from '../../../reportTable';
declare var $:any;

@Component({
  selector: 'app-purchase-register-item',
  templateUrl: './purchase-register-item.component.html',
  styleUrls: ['./purchase-register-item.component.css']
})
export class PurchaseRegisterItemComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "21_Bussiness_Reports_Purchase_Register_Itemwise";
  }

}
