import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Notification, validations } from '../../../../@core/utility-functions/utility-function';
import { StatusCodes, CountryList, StateList } from '../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { NgForm } from '@angular/forms';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';

declare var $: any;

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  @Output() newClientAdded = new EventEmitter();

  public putCallable: boolean = true;

  public client: any = {
    client_country: "India",
    client_registered: '0'
  };

  public state = new StateList();
  public countries = new CountryList();

  protected validate2 = new validations(this.client, this.constructor.name);

  constructor(
    public companyServiceService: CompanyServiceService
  ) {}

  ngOnInit() {}

  close(form: NgForm):void {
    form.resetForm({
      client_country: "India",
      client_registered: '0'
    });
    this.client = {
      client_country: "India",
      client_registered: '0'
    };
  }

  setCountry(option:boolean):void {
    if (option) {
      this.client.client_country = "India";
    }
  }

  select_client_type(gstin:string):void {
    this.client.client_country = "India";
    this.client.client_gst_id = this.client.client_gst_id.toUpperCase();
    this.client.client_pan = this.client.client_gst_id.slice(2, 12);
    this.client.client_state_code = this.client.client_gst_id.slice(0, 2);
    if (gstin.length > 5) {
      let gstin_type = gstin.slice(5, 6);
      gstin_type = gstin_type.toUpperCase();
      if (gstin_type == "C") this.client.client_type = "Company";
      else if (gstin_type == "P") this.client.client_type = "Sole Proprietor";
      else if (gstin_type == "H")
        this.client.client_type = "Hindu Undivided Family";
      else if (gstin_type == "F") this.client.client_type = "Partnership Firm";
      else if (gstin_type == "A")
        this.client.client_type = "Association Of Persons";
      else if (gstin_type == "T") this.client.client_type = "Trust";
      else if (gstin_type == "B")
        this.client.client_type = "Body Of Individuals";
      else if (gstin_type == "L") this.client.client_type = "Local Authority";
      else if (gstin_type == "J")
        this.client.client_type = "Artificial Juridical Person";
      else if (gstin_type == "G") this.client.client_type = "Government";
      else {
        this.client.client_type = "";
        Notification.error("Invalid GSTIN. Please try again.");
        this.client.client_gst_id = gstin.slice(0, 5);
      }
    }
  }

  clientSubmit(form: NgForm, isValid:boolean, data:any):void {
    if (isValid && this.putCallable) {
      this.putCallable = false;
      if (this.client.client_registered == "0") {
        delete this.client["client_gst_id"];
      }
      AsyncApiCall.put("client", this.client)
        .subscribe(resp => {
          this.putCallable = true;
          if (resp.statusCode == StatusCodes.codes.CREATED) {
            let client_id:string = resp.data[0].client_id;
            this.newClientAdded.emit({client_id: client_id, client_name: this.client.client_company});
            this.client = { client_country: "India"};
            $("#newClient").modal("hide");
            this.close(form);
          } else {
            Notification.error(resp.message, 'top', 'right');
          }
        });
    } else if(!this.putCallable) {
      console.log("new client adding : ", "Waiting for API response.");
    } else {
      Notification.error('Please fill all required Fields!', 'top', 'right');
    }
  }

  ngAfterViewInit() {
    this.validate2.validations();
  }

}
