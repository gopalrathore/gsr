import { Router } from '@angular/router';
import { HelperFunction, validations, Notification } from '../../../../@core/utility-functions/utility-function';
import { StatusCodes, ExpenseType } from '../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { AutoComplete } from '../../../../@core/services/Autocomplete';
import { Component } from '@angular/core';

export interface Details {
  account_type: string,
  amount: string,
  foreign_key: string,
  journal_credit_notes?: string,
  journal_debit_notes?: string
}

export interface Journal {
  journal_date: Date|string,
  journal_amount: string,
  journal_notes: string,
  credit_details: Details[],
  debit_details: Details[],
  inserted_ts?: Date
}

@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css']
})
export class AddJournalComponent {

  public clientNameAutocomplete:AutoComplete = new AutoComplete();
  public vendorNameAutocomplete:AutoComplete = new AutoComplete();
  public bankNameAutocomplete:AutoComplete = new AutoComplete();

  public journal:Journal = {
    journal_date: new Date(),
    journal_amount: '0',
    journal_notes: '',
    credit_details: [{
      account_type: '',
      amount: '0',
      foreign_key: '0',
      journal_credit_notes: ''
    }],
    debit_details: [{
      account_type: '',
      amount: '0',
      foreign_key: '0',
      journal_debit_notes: ''
    }]
  };

  public expenseType:string[] = new ExpenseType().getExpenseType(['Other']);

  public putCallable:boolean = true;

  protected validate:validations = new validations(this.journal);

  constructor(private router:Router) {
    this.clientNameAutocomplete.get_full_list("client","client_company_nickname","client_id");
    this.vendorNameAutocomplete.get_full_list("vendor","vendor_company_nickname","vendor_id");
    this.bankNameAutocomplete.get_full_list("bank","bank_name","bank_id");
  }


  ngAfterViewInit() {
    this.validate.validations();
  }

  bankSelected(journalType: string, index:number):void{
    let bank_id:string = this.bankNameAutocomplete.getsearchListId(
      this.journal[journalType][index]["bank_name"]
    );
    let bank = this.bankNameAutocomplete.getNameById(bank_id,"bank_id","bank_name");    
    this.journal[journalType][index]["bank_name"] = bank.bank_name;
    this.journal[journalType][index]["foreign_key"] = bank_id;
  }

  clientSelected(journalType:string, index:number) {    
    let client_id:string = this.clientNameAutocomplete.getsearchListId(
      this.journal[journalType][index]["client_name"]
    );
    let client = this.clientNameAutocomplete.getNameById(client_id,"client_id","client_name");
    this.journal[journalType][index]["client_name"] = client.client_company_nickname;
    this.journal[journalType][index]["foreign_key"] = client_id;
  }

  vendorSelected(journalType: string, index:number):void {
    let vendor_id:string = this.vendorNameAutocomplete.getsearchListId(
      this.journal[journalType][index]["vendor_name"]
    );
    let vendor = this.vendorNameAutocomplete.getNameById(vendor_id,"vendor_id","vendor_name");    
    this.journal[journalType][index]["vendor_name"] = vendor.vendor_company_nickname;
    this.journal[journalType][index]["foreign_key"] = vendor_id;
  }

  expenseSelected(journalType: string, index:number): void{
    this.journal[journalType][index]["foreign_key"] = this.journal[journalType][index]["expense_name"];
  }

  taxSelected(journalType:string, index:number): void {
    this.journal[journalType][index]["foreign_key"] = this.journal[journalType][index]["tax_type"];
  }

  public addMoreItem(journalType:string):void {
    if(journalType === 'credit_details'){
      this.journal[journalType][this.journal[journalType].length] = JSON.parse(JSON.stringify({
        account_type: '',
        amount: 0,
        foreign_key: 0,
        journal_credit_notes: ''
      }));
    }else {
      this.journal[journalType][this.journal[journalType].length] = JSON.parse(JSON.stringify({
        account_type: '',
        amount: 0,
        foreign_key: 0,
        journal_debit_notes: ''
      }));
    }
  }

  public removeMoreItem(journalType:string, index:number):void {
    let tempDetails:Details[];
    if(journalType === 'credit_details'){
      tempDetails = JSON.parse(JSON.stringify(this.journal[journalType]));
    }else {
      tempDetails = JSON.parse(JSON.stringify(this.journal[journalType]));
    }
    tempDetails.splice(index, 1);
    this.journal[journalType] = JSON.parse(JSON.stringify(tempDetails));
  }

  private calculateTotal(): boolean{
    let creditDetaisTotal:number = 0;
    let debitDetailsTotal: number = 0;
    this.journal.credit_details.map(item=>{
      creditDetaisTotal += HelperFunction.toNumber(item.amount);
    });
    this.journal.debit_details.map(item=>{
      debitDetailsTotal += HelperFunction.toNumber(item.amount);
    }); 

    if(creditDetaisTotal!==0 && creditDetaisTotal === debitDetailsTotal){      
      this.journal.journal_amount = creditDetaisTotal.toFixed(2).toString();
      return true;
    }

    if(creditDetaisTotal!==debitDetailsTotal){
      Notification.error('Credit total and debit total should match.');
    }else if(creditDetaisTotal===0){
      Notification.error('Credit total can not be zero.');
    }else {
      Notification.error('Debit total can not be zero.');
    }

    return false;
  }

  private processData(journalData:Details[]):Details[]{ 
    return journalData; 
  }

  journalSubmit(valid) {
    if (valid && this.putCallable) {
      this.putCallable = false;
      if(this.calculateTotal()){
        let journalTemp:Journal = JSON.parse(JSON.stringify(this.journal));
        journalTemp.journal_date = HelperFunction.getDate(journalTemp.journal_date);
        journalTemp.credit_details = this.processData(journalTemp.credit_details);
        journalTemp.debit_details = this.processData(journalTemp.debit_details);
        console.log("data", journalTemp);     
        AsyncApiCall.put('journals', journalTemp).subscribe(resp=>{
          this.putCallable = true;
          if(resp.statusCode === StatusCodes.codes.CREATED ){
            Notification.showAlert('success', "Journal created", this.router, 'journal');
          }else {
            Notification.error(resp.message);
          }
        });

      }else {
        this.putCallable = true;
        // Notification.error("Credit total amount and debit total amount should be equal.");
      }
    } else if (!this.putCallable) {
      console.warn("addJournal : ", "Waiting for API response.");
    } else {
      Notification.error("Please fill all required Fields!")
    }
  }
}
