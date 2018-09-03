
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { createTable } from '../createTable';
import { TransfereService } from '../../../@core/services/transfer.service';
import { CompanyServiceService } from '../../../@core/services/company-service.service';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent extends createTable implements OnInit {

  constructor(
    protected companyServiceService:CompanyServiceService,
    protected transfereService:TransfereService,
    protected router:Router
  ) { 
    super(companyServiceService, transfereService, router);
      this.dataTableSettings();
  }

  ngOnInit() { }

  ngAfterViewInit(){
    this.drawTable(); 
  }

  dataTableSettings(){
    this.defineHeaders([ '#', 'Employee Name', 'Employee Department', 'Designation', 'Employee Email', 'Action' ]);
    this.dataTableMessages = {
      searchPlaceholder: "Search Employee",
      dataSafe: "Your employee is safe!",
      dataNotFound: "No Employee Added."
    };
    this.allAPIparams = {
      getTableData: "employee",
      deleteTableData: "employee",
      responseKeys :{
        primaryKey: "employee_id",
        nameKeyIndex: 1
      }
    };

    this.dataAttributes = {
      fields: ['employee_id','employee_first_name', 'employee_job_department', 'employee_job_title', 'employee_email', 'status'],
      offset: 0,
      order: [{ORDER_BY:"status", ORDER_TYPE:"ASC"},{ORDER_BY:"inserted_ts", ORDER_TYPE:"DESC"}],
      limit: 1000
    };

    this.allRoutes ={
      editRoute: "/employee/edit-employee"
    };
  }
  
  tableDataManupulator(index, jsonData){
    let dbtn  = this.dataTableButtons;
    let dlbs  = this.dataTableLables;
    let data = JSON.parse(jsonData);


      let t  = [index, 
        data['employee_first_name'],
        data['employee_job_department'],
        data['employee_job_title'],              
        data['employee_email'],
        data['status']==='1'? dbtn.editBtn+dbtn.deleteBtn:dlbs.disabled
            
      ];
              
    return JSON.stringify(t);
  }
}
