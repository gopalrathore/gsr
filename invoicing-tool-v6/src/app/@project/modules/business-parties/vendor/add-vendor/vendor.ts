import { endPoints } from '../../../../../../environments/environment.prod';
import { AsyncApiCall } from "../../../../../@core/services/async-api-call";
import { Notification, validations } from "../../../../../@core/utility-functions/utility-function";
import { Router } from "@angular/router";
import { StateList, CountryList } from "../../../../../@core/dataset/dataset";
import { CompanyServiceService } from "../../../../../@core/services/company-service.service";

declare var $: any;
declare var swal: any;

declare interface contactPerson {
  salutation: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  work_number: string;
  department: string;
  email_marking: string;
  designation: string;
  email: string;
  note: string;
}

export class Vendor {
  public vendor: any = {
    vendor_registered: "1",
    vendor_country: "India",
    vendor_shipping_country: "India",
    contact_person: [],
    vendor_primary_contact_email_marking: "No",
    vendor_gsttreatment: "Regular",
    vendor_gst_id: ''
  };
  public putCallable: boolean = true;
  public patchCallable: boolean = true;

  public ifscValid: boolean = false;

  private contact_person: contactPerson = {
    salutation: "",
    first_name: "",
    last_name: "",
    mobile_number: "",
    work_number: "",
    department: "",
    designation: "",
    email: "",
    note: "",
    email_marking: "No"
  };

  public state = new StateList();
  public countries = new CountryList();
  protected validate = new validations(this.vendor);

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected router: Router
  ) {}

  /**
   * @description check ifsc code
   * @returns void
   */
  public checkIFSC(): void {
    this.ifscValid = false;

    if (this.vendor.vendor_bank_ifsc.length == 11) {
      AsyncApiCall.customGet(
        endPoints.IFSC + this.vendor.vendor_bank_ifsc
      ).subscribe(resp => {
        if (resp.statusCode == 200) {
          this.ifscValid = true;
          this.vendor.vendor_bank_name = resp.data["BANK"];
          this.vendor.vendor_bank_branch_name = resp.data["BRANCH"];
        } 
      });
    }
  }

  /**
   * @description select vendor type using gstin
   * @param gstin gstin of the user
   * @returns void
   */
  protected select_vendor_type(gstin: string): void {
    this.vendor.vendor_country = "India";
    this.vendor.vendor_gst_id = this.vendor.vendor_gst_id.toUpperCase();
    this.vendor.vendor_pan = this.vendor.vendor_gst_id.slice(2, 12);
    this.vendor.vendor_state_code = this.vendor.vendor_gst_id.slice(0, 2);
    if (gstin.length > 5) {
      let gstin_type = gstin.slice(5, 6);
      gstin_type = gstin_type.toUpperCase();
      if (gstin_type == "C") this.vendor.vendor_type = "Company";
      else if (gstin_type == "P") this.vendor.vendor_type = "Sole Proprietor";
      else if (gstin_type == "H")
        this.vendor.vendor_type = "Hindu Undivided Family";
      else if (gstin_type == "F") this.vendor.vendor_type = "Partnership Firm";
      else if (gstin_type == "A")
        this.vendor.vendor_type = "Association Of Persons";
      else if (gstin_type == "T") this.vendor.vendor_type = "Trust";
      else if (gstin_type == "B")
        this.vendor.vendor_type = "Body Of Individuals";
      else if (gstin_type == "L") this.vendor.vendor_type = "Local Authority";
      else if (gstin_type == "J")
        this.vendor.vendor_type = "Artificial Juridical Person";
      else if (gstin_type == "G") this.vendor.vendor_type = "Government";
      else {
        this.vendor.vendor_type = "";
        Notification.error("Invalid GSTIN. Please try again.");
        this.vendor.vendor_gst_id = gstin.slice(0, 5);
      }
    }
  }

  /**
   * @description add contact person
   * @returns void
   */
  public addMoreItem(): void {
    this.vendor.contact_person.push(
      JSON.parse(JSON.stringify(this.contact_person))
    );
  }

  /**
   * @description remove contact person
   * @param index index of the contact person to be deleted
   * @returns void
   */
  protected removeMoreItem(index: number): void {
    this.vendor.contact_person.splice(index, 1);
  }

  /**
   * @description alert when table action is performed
   * @param test text to be shown on alert
   * @returns void
   */
  protected showAlert(test: string = "Operation successfully."): void {
    let that = this;
    swal({
      title: "Success",
      text: test,
      type: "success",
      showCancelButton: false,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "Proceed",
      buttonsStyling: false
    }).then(function() {
      that.router.navigateByUrl("business-parties/vendors");
    });
  }

  /**
   * @description set country to india
   * @param option flag to set country as india
   * @returns void
   */
  public setCountry(option: boolean): void {
    if (option) {
      this.vendor.vendor_country = "India";
    }
  }

  /**
   * @description delete primary contact
   * @returns void
   */
  protected deletePrimaryContact(): void {
    this.vendor.vendor_primary_contact_salutation = "";
    this.vendor.vendor_primary_contact_first_name = "";
    this.vendor.vendor_primary_contact_last_name = "";
    this.vendor.vendor_primary_contact_mobile = "";
    this.vendor.vendor_primary_contact_work_number = "";
    this.vendor.vendor_primary_contact_email = "";
    this.vendor.vendor_primary_contact_department = "";
    this.vendor.vendor_primary_contact_designation = "";
  }

  /**
   * @description delete bank data if needed
   * @returns void
   */
  protected deleteBank(): void {
    this.vendor.vendor_bank_name = "";
    this.vendor.vendor_bank_branch_name = "";
    this.vendor.vendor_bank_account_number = "";
    this.vendor.vendor_bank_ifsc = "";
    this.vendor.vendor_bank_account_type = "";
  }

  public toggleContactBookItem(index){
    $('#collapse'+index).toggleClass("hidden");    
  }

  ngAfterViewInit() {
    this.validate.validations();
  }

}
