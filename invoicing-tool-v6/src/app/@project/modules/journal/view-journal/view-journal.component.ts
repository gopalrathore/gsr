import { Notification } from '../../../../@core/utility-functions/utility-function';
import { StatusCodes } from '../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { Router } from '@angular/router';
import { TransfereService } from '../../../../@core/services/transfer.service';
import { Component } from '@angular/core';
import { Journal } from '../add-journal/add-journal.component';

@Component({
  selector: 'app-view-journal',
  templateUrl: './view-journal.component.html',
  styleUrls: ['./view-journal.component.css']
})
export class ViewJournalComponent {

  private journalId: number = this.transfereService.getData();

  public journal:Journal = {
    journal_date: "",
    journal_amount: '0',
    journal_notes: '',
    credit_details: [],
    debit_details: []
  };

  constructor(private transfereService:TransfereService, private router:Router) {
    isNaN(this.journalId) ? this.router.navigateByUrl("/journal") : this.getJournalData();    
  }

  getJournalData() {
    AsyncApiCall.get("journals", { journal_id: this.journalId }).subscribe(resp => {
      if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        console.log("journal data", resp);
        this.journal = resp.data[0];
      } else {
        Notification.error("Something Went Wrong, Try again");
        this.router.navigateByUrl("/journal");
      }
    });
  }

}
