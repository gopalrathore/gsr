import { StatusCodes } from '../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { Notification } from '../../../../@core/utility-functions/utility-function';
import { TransfereService } from "../../../../@core/services/transfer.service";
import { Router } from "@angular/router";
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { Employee } from "./employee";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"]
})
export class AddEmployeeComponent extends Employee implements OnInit {
  

  constructor(
    public companyServiceService: CompanyServiceService,
    protected router: Router,
    protected transfereService: TransfereService
  ) {
    super(companyServiceService, router, transfereService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.validate.validations();
  }

  employeeSubmit(isValid) {
    if (isValid && this.putCallable) {
      this.putCallable = false;
      console.log("employee", JSON.stringify(this.employee, undefined, 2));
      AsyncApiCall.put('employee', this.employee)
        .subscribe(resp => {
          this.putCallable = true;
          if (resp.statusCode === StatusCodes.codes.CREATED)
            this.showAlert("Employee has been added successfully.");
          else
          Notification.error(resp.message);
        });
    } else if(!this.putCallable){
      console.warn("addEmployee: waiting for api response.");
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }
}
