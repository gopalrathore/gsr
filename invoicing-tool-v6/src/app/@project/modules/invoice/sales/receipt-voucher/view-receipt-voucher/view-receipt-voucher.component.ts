import { SalesInvoiceView } from '../../sales-invoice-view/sales-invoice-view';
import { InvoiceDataResponse } from '../../@salesInvoiceCreationController/@interfaces/invoice-data-response';
import { StatusCodes } from '../../../../../../@core/dataset/status-code/codes';
import { AsyncApiCall } from '../../../../../../@core/services/async-api-call';
import { Router } from '@angular/router';
import { TransfereService } from '../../../../../../@core/services/transfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-receipt-voucher',
  templateUrl: './view-receipt-voucher.component.html',
  styleUrls: ['./view-receipt-voucher.component.css']
})
export class ViewReceiptVoucherComponent extends SalesInvoiceView implements OnInit {



  constructor(protected transfereService:TransfereService, protected router:Router) {
    super(transfereService, router)
  }

  ngOnInit() {
  }

}
