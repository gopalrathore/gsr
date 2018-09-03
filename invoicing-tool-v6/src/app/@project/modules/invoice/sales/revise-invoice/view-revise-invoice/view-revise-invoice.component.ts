import { InvoiceDataResponse } from '../../@salesInvoiceCreationController/@interfaces/invoice-data-response';
import { StatusCodes } from '../../../../../../@core/dataset/status-code/codes';
import { AsyncApiCall } from '../../../../../../@core/services/async-api-call';
import { Router } from '@angular/router';
import { TransfereService } from '../../../../../../@core/services/transfer.service';
import { Component, OnInit } from '@angular/core';
import { SalesInvoiceView } from '../../sales-invoice-view/sales-invoice-view';

@Component({
  selector: 'app-view-revise-invoice',
  templateUrl: './view-revise-invoice.component.html',
  styleUrls: ['./view-revise-invoice.component.css']
})
export class ViewReviseInvoiceComponent extends SalesInvoiceView implements OnInit {

  constructor(protected transfereService:TransfereService, protected router:Router) {
    super(transfereService, router);
  }

  ngOnInit() {
  }
}
