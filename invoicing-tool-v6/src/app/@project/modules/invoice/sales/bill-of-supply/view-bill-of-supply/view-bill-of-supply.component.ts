import { SalesInvoiceView } from '../../sales-invoice-view/sales-invoice-view';
import { InvoiceDataResponse } from '../../@salesInvoiceCreationController/@interfaces/invoice-data-response';
import { StatusCodes } from '../../../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../../../@core/services/async-api-call';
import { Router } from '@angular/router';
import { TransfereService } from '../../../../../../@core/services/transfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-bill-of-supply',
  templateUrl: './view-bill-of-supply.component.html',
  styleUrls: ['./view-bill-of-supply.component.css']
})
export class ViewBillOfSupplyComponent extends SalesInvoiceView implements OnInit {

  constructor(protected transfereService:TransfereService, protected router:Router) {
    super(transfereService, router)
  }

  ngOnInit() {
  }

}
