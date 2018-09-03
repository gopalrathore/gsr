import { Router } from '@angular/router';
import { TransfereService } from '../../../../../../@core/services/transfer.service';
import { Component } from '@angular/core';
import { SalesInvoiceView } from '../../sales-invoice-view/sales-invoice-view';

@Component({
  selector: 'app-view-tax-invoice',
  templateUrl: './view-tax-invoice.component.html',
  styleUrls: ['./view-tax-invoice.component.css']
})
export class ViewTaxInvoiceComponent extends SalesInvoiceView { 

  constructor(protected transfereService:TransfereService, protected router:Router) {
    super(transfereService, router);
  }
}

