import { Router } from '@angular/router';
import { TransfereService } from '../../../../../../@core/services/transfer.service';
import { SalesInvoiceView } from '../../sales-invoice-view/sales-invoice-view';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-debit',
  templateUrl: './view-debit.component.html',
  styleUrls: ['./view-debit.component.css']
})
export class ViewDebitComponent extends SalesInvoiceView implements OnInit {

  constructor(protected transfereService:TransfereService, protected router:Router) {
    super(transfereService, router);
   }

  ngOnInit() {
  }

}
