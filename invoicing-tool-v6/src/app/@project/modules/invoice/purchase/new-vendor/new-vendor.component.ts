import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Notification, validations } from '../../../../../@core/utility-functions/utility-function';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import { StateList, StatusCodes, CountryList } from "../../../../../@core/dataset/dataset";
import { CompanyServiceService } from "../../../../../@core/services/company-service.service";
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: "app-new-vendor",
  templateUrl: "./new-vendor.component.html",
  styleUrls: ["./new-vendor.component.css"]
})
export class NewVendorComponent implements OnInit {
  @Output() newVendorAdded = new EventEmitter();

  public putCallable: boolean = true;

  public vendor: any = {
    vendor_country: "India"
  };

  public state = new StateList();
  public countries = new CountryList();

  protected validate = new validations(this.vendor, this.constructor.name);

  constructor(public companyServiceService: CompanyServiceService) {}

  ngOnInit() { }

  setCountry(option:boolean):void {
    if (option) {
      this.vendor.vendor_country = "India";
    }
  }

  close(form: NgForm):void {
    form.resetForm({
      vendor_country: "India"
    });
    this.vendor = {
      vendor_country: "India"
    };
  }

  select_vendor_type(gstin:string):void {
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
        Notification.error("Invalid GSTIN. Please try again.")
        this.vendor.vendor_gst_id = gstin.slice(0, 5);
      }
    }
  }

  vendorSubmit(form: NgForm, isValid:boolean, data:any) {
    if (isValid && this.putCallable) {
      this.putCallable = false;
      if (this.vendor.vendor_registered == "0") {
        delete this.vendor["vendor_gst_id"];
      }

      AsyncApiCall.put('vendor', this.vendor)
        .subscribe(resp => {
          this.putCallable = true;
          if (resp.statusCode == StatusCodes.codes.CREATED) {
            let vendor_id:string = resp.data[0].vendor_id;
            this.newVendorAdded.emit(vendor_id);
            this.vendor = {
              vendor_country: "India"
            };
            $("#newVendor").modal("hide");
            this.close(form);
          } else {
            Notification.error(resp.message);
          }
        });
    } else if(!this.putCallable) {
      console.log("new vendor adding : ", "Waiting for API response.");
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }

}
