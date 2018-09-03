import { StatusCodes } from '../../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Notification } from '../../../../../@core/utility-functions/functions/notification';

import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  ticket:any = {};

  typeSelect = [
    {key: "Support", value: "Support"},
    {key: "Request for Customisation", value: "Request for Customisation"},
    {key: "Want to know more about products and features", value: "Want to know more about products and features"},
    {key: "Others", value: "Others"}
  ];

  constructor(
    private companyServiceService:CompanyServiceService
  ) { }

  ngOnInit() {
  }

  close(form: NgForm){
    
    $('#newTicket').modal('hide')
    form.resetForm();
    this.ticket = {}
  }

  ticketSubmit(form: NgForm){
    if(form.valid){
      this.ticket.deviceInfo = navigator.userAgent;
      this.ticket.deviceWidth = window.innerWidth;
      this.ticket.deviceHeight = window.innerHeight;   
      AsyncApiCall.put('supportTicket', this.ticket).subscribe((resp)=>{
        if(resp.statusCode===StatusCodes.codes.CREATED){
          Notification.success('Support Ticket Raised!');
          $('.close').click();
          form.resetForm();
        }else {
          Notification.error(resp.message);
        }
      });      
    }else {
      Notification.error('Please fill all the required Fields!');
    }   
    
  }

}
