import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { StatusCodes } from '../../../../@core/dataset/status-code/codes';
import { Notification } from '../../../../@core/utility-functions/utility-function';
import { Router } from '@angular/router';
import { TransfereService } from '../../../../@core/services/transfer.service';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeInterface } from '../interface/employee.interface';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class EditEmployeeComponent extends Employee implements OnInit {
  public employee:EmployeeInterface;  
  private employeeId:number = this.transfereService.getData();
  constructor(
    public companyServiceService:CompanyServiceService,
    protected transfereService:TransfereService,
    protected router:Router
  ) { 
    super(companyServiceService, router, transfereService);
    if(this.employeeId){
      this.getEmployeeData(this.employeeId);
    }
    else{
      this.router.navigateByUrl('/employee');
    }
  }

  ngOnInit() { }
 
  employeeSubmit(isValid){
    if (isValid && this.patchCallable) {
      this.patchCallable = false;
      AsyncApiCall.patch('employee', this.employee)
        .subscribe(resp => {
          this.patchCallable = true;
          if (resp.statusCode === StatusCodes.codes.ACCEPTED)
            this.showAlert("Employee has been added successfully.");
          else
          Notification.error(resp.message);
        });
    } else if(!this.patchCallable){
      console.warn("editEmployee: waiting for api response.");
    } else {
      Notification.error("Please fill all required Fields!");
    }

  }

}

