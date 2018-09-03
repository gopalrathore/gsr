import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StatusCodes } from '../../../../../@core/dataset/dataset';
import { StringManipulation, Notification } from '../../../../../@core/utility-functions/utility-function';
import { AsyncApiCall } from '../../../../../@core/services/async-api-call';

import { Client } from './client';

import { CompanyServiceService } from '../../../../../@core/services/company-service.service';
import { TransfereService } from '../../../../../@core/services/transfer.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class EditClientComponent extends Client{

  public componentName: string = "Edit Client";
  protected clientId: number = this.transfereService.getData();

  constructor(
    public companyServiceService: CompanyServiceService,
    protected transfereService: TransfereService,
    protected router: Router) {
    super(companyServiceService, router);
    if (this.clientId) {
      this.getClientData();
    }
    else {
      this.router.navigateByUrl('/business-parties/clients');
    }
  }


  /**
   * @description get individual client data to be edited
   * @returns void
   */
  protected getClientData(): void {
    AsyncApiCall.get('client', { client_id: this.clientId }).subscribe(resp => {
      let output: string;
      this.client = resp.data[0];
      if (typeof (this.client.client_note) === "string") {
        output = StringManipulation.decodeHtml(StringManipulation.escapeHtml(this.client.client_note));
        this.client.client_note = output;
      }
      if (typeof (this.client.client_primary_contact_remark) === "string") {
        output = StringManipulation.decodeHtml(StringManipulation.escapeHtml(this.client.client_primary_contact_remark));
        this.client.client_primary_contact_remark = output;
      }

      for (let i:number = 0; i < this.client.contact_person.length; i++) {
        if (typeof (this.client.contact_person[i].note) === "string") {
          output = StringManipulation.decodeHtml(StringManipulation.escapeHtml(this.client.contact_person[i].note));
          this.client.contact_person[i].note = output;
        }
      }
      if (this.client.client_shipping_address != null && this.client.client_shipping_address.length != 0) {
        this.addShipping = true;
      }

      this.validate.changerefrence(this.client);
    });
  }

  /**
   * @description edit client to database
   * @param isValid true if client form is valid
   * @param data client form data
   */
  public clientSubmit(isValid: boolean, data: object) {
    if (isValid && this.patchCallable) {
      this.patchCallable = false;
      if (this.addShipping === false) {
        this.client['client_shipping_address'] = "";
        this.client['client_shipping_address_2'] = "";
        this.client['client_shipping_address_3'] = "";
        this.client['client_shipping_address_4'] = "";
        this.client['client_shipping_country'] = "";
        this.client['client_shipping_state_code'] = "";
        this.client['client_shipping_state_name'] = "";
      }

      AsyncApiCall.patch('client', this.client).subscribe(resp => {
        this.patchCallable = true;
        if (resp.statusCode === StatusCodes.codes.ACCEPTED)
          this.showAlert("Client has been edited successfully.");
        else
          Notification.error(resp.message);
      });

    } else if(!this.patchCallable){
      console.warn("editClient: waiting for api response.");      
    } else {
      Notification.error('Please fill all required Fields!');
    }

  }

}
