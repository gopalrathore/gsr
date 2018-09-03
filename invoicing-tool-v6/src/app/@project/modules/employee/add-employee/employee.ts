
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { TransfereService } from "../../../../@core/services/transfer.service";
import { CalendarModule } from "primeng/primeng";
import { Router } from "@angular/router";
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { validations } from "../../../../@core/utility-functions/utility-function";
import { StateList, CountryList, StatusCodes } from '../../../../@core/dataset/dataset';
import { EmployeeInterface } from '../interface/employee.interface';
import { endPoints } from '../../../../../environments/environment.prod';

declare var $: any;
declare var swal: any;

export class Employee {

  public path:string = "";
  public uploadedFileLink:string = "";

  public employee: EmployeeInterface = {
    employee_country: "India",
    employee_emergency_person_salutation: 'Mrs.',
    employee_bank_ifsc: "",
    employee_marital_status: 'U',
    employee_job_status: "Active",
    employee_emergency_person_country: "India",
    employee_salutation: "Mr.",
    employee_first_name: null,
    employee_last_name: null,
    employee_address: null,
    employee_address_2: null,
    employee_address_3: null,
    employee_address_4: null,
    employee_state_code: null,
    employee_email: null,
    employee_mobile: null,
    employee_dob: null,
    employee_pan: null,
    employee_aadhar: null,
    employee_custom_label_1: null,
    employee_custom_value_1: null,
    employee_custom_label_2: null,
    employee_custom_value_2: null,
    employee_work_mobile: null,
    employee_qualification: null,
    employee_job_title: null,
    employee_job_employee_id: null,
    employee_card: null,
    employee_job_supervisor: null,
    employee_job_department: null,
    employee_job_work_location: null,
    employee_job_email: null,
    employee_job_work_phone: null,
    employee_emergency_person_address: null,
    employee_emergency_person_address_2: null,
    employee_emergency_person_address_3: null,
    employee_emergency_person_address_4: null,
    employee_emergency_person_state_code: null,
    employee_job_cell_phone: null,
    employee_emergency_person_first_name: null,
    employee_emergency_person_middle_name: null,
    employee_emergency_person_last_name: null,
    employee_job_hire_date: null,
    employee_job_end_date: null,
    employee_job_salary: null,
    employee_job_custom_label_1: null,
    employee_job_custom_value_1: null,
    employee_job_custom_label_2: null,
    employee_job_custom_value_2: null,
    employee_job_remarks: null,
    employee_bank_name: null,
    employee_bank_branch_name: null,
    employee_bank_account_holder_name: null,
    employee_bank_account_number: null,
    employee_bank_account_type: "S",
    employee_emergency_person_mobile: null,
    employee_emergency_person_alt_mobile: null,
    employee_emergency_person_relation: null
  };

  public ifscValid = false;
  public state = new StateList();
  public countries = new CountryList();

  public putCallable: boolean = true;
  public patchCallable: boolean = true;

  protected validate = new validations(this.employee);

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected router: Router,
    protected transfereService: TransfereService
  ) {}

  checkIFSC() {
    this.ifscValid = false;

    if (this.employee.employee_bank_ifsc.length === 11) {
      AsyncApiCall.customGet(endPoints.IFSC+this.employee.employee_bank_ifsc).subscribe((resp)=>{
        if(resp.statusCode===StatusCodes.codes.OK){
          this.ifscValid = true;
          this.employee.employee_bank_name = resp.data['BANK'];
          this.employee.employee_bank_branch_name = resp.data['BRANCH'];
        }else {
          this.ifscValid = false;
        }
        
      });
    }
  }
  
  public fileUploaded(path: string): void {}

  getEmployeeData(employeeId: number) {
    AsyncApiCall.get('employee', { employee_id: employeeId })
      .subscribe(resp => {
        if (resp.data[0].employee_bank_ifsc === null) this.ifscValid = false;
        else {
          this.ifscValid = true;
        }
        this.employee = resp.data[0];
        this.employee.employee_dob = new Date(resp.data[0].employee_dob);
        console.log("hiring date", resp.data[0].employee_job_hire_date);
        
        this.employee.employee_job_hire_date!==null && this.employee.employee_job_hire_date!='' ? this.employee.employee_job_hire_date = new Date(
          resp.data[0].employee_job_hire_date
        ) : false;
        this.employee.employee_job_end_date!==null && this.employee.employee_job_end_date!='' ? this.employee.employee_job_end_date = new Date(
          resp.data[0].employee_job_end_date
        ) : false;
      });
  }

  protected showAlert(text: string): void {
    let that = this;
    swal({
      title: "Success",
      text: text,
      type: "success",
      showCancelButton: false,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "Proceed",
      buttonsStyling: false
    }).then(function() {
      that.router.navigateByUrl("employee");
    });
  }
}
