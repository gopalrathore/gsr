import { Component, OnInit } from '@angular/core';
import { createTable } from '../../createTable';

import { Router } from '@angular/router';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { TransfereService } from '../../../../@core/services/transfer.service';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.css']
})
export class ContactBookComponent extends createTable implements OnInit {

  constructor(
    protected companyServiceService:CompanyServiceService,
    protected transfereService:TransfereService,
    protected router:Router
  ) {
      super(companyServiceService, transfereService, router);
      this.dataTableSettings();
  }

  ngOnInit(){ }
  
  ngAfterViewInit(){
    this.drawTable();
  }

    dataTableSettings(){
      this.defineHeaders(['S.No', 'Name', 'Company', 'Department', 'Designation', 'Email', 'Work Phone', 'Mobile Phone', 'Status', 'Action']);
      this.dataTableMessages = {
        searchPlaceholder: "Search Contact",
        dataSafe: "Your contact is safe!",
        dataNotFound: "No Contact Added."
      };
      this.allAPIparams = {
        getTableData: "list_contact",
        deleteTableData: "delete_contact",
        responseKeys :{
          primaryKey: "contact_id",
          nameKeyIndex: 1
        }
      };
      this.allRoutes ={
        editRoute: "business-parties/contact-book/edit"
      };
    }
    
    tableDataManupulator(index, jsonData){
      let dbtn  = this.dataTableButtons;
      let dlbs  = this.dataTableLables;
      let data = JSON.parse(jsonData);

      
      let t =  [  index, 
                  data['client_company'],
                  data['client_email'],  
                  data['client_primary_contact_mobile'], 
                  data['client_registered']==='1'?dlbs.registered:dlbs.unregistered,
                  data['status']==='1'? dbtn.editBtn+dbtn.deleteBtn:dlbs.disabled];
      return JSON.stringify(t);
  }

}
