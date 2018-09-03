import { Notification, HelperFunction } from '../../../../@core/utility-functions/utility-function';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { TaxRates, StatusCodes } from '../../../../@core/dataset/dataset';
import { expenseUtility } from "../expense-utility";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { TransfereService } from "../../../../@core/services/transfer.service";
import { StateList } from "../../../../@core/dataset/state/states";
import { AutoComplete } from "../../../../@core/services/Autocomplete";

declare var $: any;
declare var swal: any;

@Component({
  selector: "app-edit-expense",
  templateUrl: "./add-expenses.component.html",
  styleUrls: ["./add-expenses.component.css"]
})
export class EditExpenseComponent extends expenseUtility implements OnInit {
  public componentName = "Edit Expenses";
  private expenseId = this.transfereService.getData();
  public taxRate: number[] = new TaxRates().getTaxRates();

  public state = new StateList();



  constructor(
    public companyServiceService: CompanyServiceService,
    protected transfereService: TransfereService,
    protected router: Router
  ) {
    super(companyServiceService, router);

    if (this.expenseId) {
      this.getExpenseData(this.expenseId);
    } else {
      this.router.navigateByUrl("/expenses");
    }
  }

  ngOnInit() {
    this.validate.validations();
  }

  employeeSelected() {
    this.expense["expense_employee_id"] = this.employeeName.getsearchListId(
      this.expense.expense_employee_name
    );
  }

  

  expenseSubmit(isValid) {
    let expense_temp = JSON.parse(JSON.stringify(this.expense));


    if (isValid && this.patchCallable) {
      this.patchCallable = false;


      expense_temp.expense_reverse_charge = expense_temp.expense_reverse_charge ? 1 : 0;
      expense_temp.expense_tax_inclusion = expense_temp.expense_tax_inclusion ? 'inclusive' : 'exclusive';

      expense_temp.expense_invoice_date = HelperFunction.getDate(this.expense.expense_invoice_date);
      expense_temp.expense_date = HelperFunction.getDate(this.expense.expense_date);

      AsyncApiCall.patch('expense', expense_temp).subscribe(resp => {
        this.patchCallable = true;
        if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
          this.showAlert();
        } else {
          Notification.error("Something went wrong, try again");
        }
      });
    } else if (!this.patchCallable) {
      console.warn("editExpense: waiting for api resposne.");
    } else {
      Notification.error('Please fill all required Fields!');
    }
  }
}
