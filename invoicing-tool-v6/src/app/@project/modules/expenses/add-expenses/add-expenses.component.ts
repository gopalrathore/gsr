import { StatusCodes } from '../../../../@core/dataset/status-code/codes';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { Router } from "@angular/router";
import { expenseUtility } from "../expense-utility";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { CompanyServiceService } from "../../../../@core/services/company-service.service";
import { TaxRates, StateList } from "../../../../@core/dataset/dataset";

declare var $: any;

@Component({
  selector: "app-add-expenses",
  templateUrl: "./add-expenses.component.html",
  styleUrls: ["./add-expenses.component.css"]
})
export class AddExpensesComponent extends expenseUtility implements OnInit {
  public componentName:string = "Add Expense";
  public taxRate:number[] = new TaxRates().getTaxRates();
  
  
  public state = new StateList();

  

  constructor(
    public companyServiceService: CompanyServiceService,
    protected router: Router
  ) {
    super(companyServiceService, router);
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.validate.validations();
  }

  
  employeeSelected() {
    this.expense["expense_employee_id"] = this.employeeName.getsearchListId(
      this.expense.expense_employee_name
    );
  }

  
  expenseSubmit(isValid) {
    super.expenseSubmit(isValid);
  }

  
}
