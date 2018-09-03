import { Router } from "@angular/router";
import {
  StateList,
  TooltipClient,
  CountryList
} from "../../../../../@core/dataset/dataset";
import { validations, Notification } from "../../../../../@core/utility-functions/utility-function";
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

export class Client {
  public addShipping: boolean = false;
  public putCallable:boolean = true;
  public patchCallable:boolean = true;

  public client: any = {
    client_registered: "1",
    client_country: "India",
    client_shipping_country: "India",
    contact_person: [],
    client_primary_contact_email_marking: "No",
    client_gsttreatment: "Regular",
    client_gst_id: ''
  };

  private contact_person: contactPerson = {
    salutation: "",
    first_name: "",
    last_name: "",
    mobile_number: "",
    work_number: "",
    department: "",
    designation: "",
    email_marking: "No",
    email: "",
    note: ""
  };

  private state = new StateList();

  public countries = new CountryList();

  protected validate: validations = new validations(this.client);
  protected toolTip: TooltipClient = new TooltipClient(false);

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected router: Router
  ) {}

  /**
   * @description pre select client type
   * @param gstin gstin of company
   * @returns void
   */
  protected select_client_type(gstin: string): void {
    this.client.client_country = "India";
    this.client.client_gst_id = this.client.client_gst_id.toUpperCase();
    this.client.client_pan = this.client.client_gst_id.slice(2, 12);
    this.client.client_state_code = this.client.client_gst_id.slice(0, 2);
    if (gstin.length > 5) {
      let gstin_type = gstin.slice(5, 6);
      gstin_type = gstin_type.toUpperCase();
      if (gstin_type === "C") this.client.client_type = "Company";
      else if (gstin_type === "P") this.client.client_type = "Sole Proprietor";
      else if (gstin_type === "H")
        this.client.client_type = "Hindu Undivided Family";
      else if (gstin_type === "F") this.client.client_type = "Partnership Firm";
      else if (gstin_type === "A")
        this.client.client_type = "Association Of Persons";
      else if (gstin_type === "T") this.client.client_type = "Trust";
      else if (gstin_type === "B")
        this.client.client_type = "Body Of Individuals";
      else if (gstin_type === "L") this.client.client_type = "Local Authority";
      else if (gstin_type === "J")
        this.client.client_type = "Artificial Juridical Person";
      else if (gstin_type === "G") this.client.client_type = "Government";
      else {
        this.client.client_type = "";
        Notification.error("Invalid GSTIN. Please try again.");
        this.client.client_gst_id = gstin.slice(0, 5);
      }
    }
  }

  /**
   * @description Add item to contact person
   * @returns void
   */
  public addMoreItem(): void {
    this.client.contact_person.push(
      JSON.parse(JSON.stringify(this.contact_person))
    );
    setTimeout(function() {
      $('[rel="tooltip"]').tooltip();
    }, 0);
  }

  /**
   * @description remove item from contact person
   * @param index index to be removed
   * @returns void
   */
  protected removeMoreItem(index: number): void {
    this.client.contact_person.splice(index, 1);
  }

  /**
   * @description show alert
   * @param message message to be shown on alert
   * @returns void
   */
  protected showAlert(message: string = "Operation successfully."): void {
    let that = this;
    swal({
      title: "Success",
      text: message,
      type: "success",
      showCancelButton: false,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "Proceed",
      buttonsStyling: false
    }).then(function() {
      that.router.navigateByUrl("business-parties/clients");
    });
  }

  /**
   * @description delete primary contact detail if not set
   * @returns void
   */
  protected deletePrimaryContact(): void {
    this.client.client_primary_contact_salutation = "";
    this.client.client_primary_contact_first_name = "";
    this.client.client_primary_contact_last_name = "";
    this.client.client_primary_contact_mobile = "";
    this.client.client_primary_contact_work_number = "";
    this.client.client_primary_contact_email = "";
    this.client.client_primary_contact_department = "";
    this.client.client_primary_contact_designation = "";
  }

  public toggleContactBookItem(index){
    $('#collapse'+index).toggleClass("hidden");    
  }

  ngAfterViewInit() {
    this.validate.validations();
  }
}
