import { Router } from '@angular/router';
import { TransfereService } from '../../../../../../@core/services/transfer.service';
import { SalesInvoiceView } from '../../sales-invoice-view/sales-invoice-view';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-credit',
  templateUrl: './view-credit.component.html',
  styleUrls: ['./view-credit.component.css']
})
export class ViewCreditComponent extends SalesInvoiceView implements OnInit {

  constructor(protected transfereService:TransfereService, protected router:Router) {
    super(transfereService, router)
  }

  ngOnInit() {
  }

}
