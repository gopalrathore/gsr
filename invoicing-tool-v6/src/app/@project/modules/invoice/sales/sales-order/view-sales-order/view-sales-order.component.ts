import { Component, OnInit } from '@angular/core';
import { SalesInvoiceView } from '../../sales-invoice-view/sales-invoice-view';
import { TransfereService } from '../../../../../../@core/services/transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-sales-order',
  templateUrl: './view-sales-order.component.html',
  styleUrls: ['./view-sales-order.component.css']
})
export class ViewSalesOrderComponent extends SalesInvoiceView {

  constructor(protected transfereService:TransfereService, protected router:Router) {
    super(transfereService, router);
  }

}
