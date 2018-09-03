import { reportTable } from '../../../reportTable';
import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-goods-service',
  templateUrl: './goods-service.component.html',
  styleUrls: ['./goods-service.component.css']
})
export class GoodsServiceComponent extends reportTable implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
    this.report.report_name = "19_Bussiness_Reports_Goods_Service_Report";
  }
}
