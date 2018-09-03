import { StatusCodes } from '../../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { CompanyServiceService } from "../../../../../@core/services/company-service.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

declare var $: any;
declare var swal: any;

@Component({
  selector: "app-add-support-ticket",
  templateUrl: "./add-support-ticket.component.html",
  styleUrls: ["./add-support-ticket.component.css"]
})
export class AddSupportTicketComponent implements OnInit {
  ticket: any = {
    type: "Support"
  };

  @Output() newTicketAdded = new EventEmitter();

  constructor(private companyServiceService: CompanyServiceService) {}

  ngOnInit() {}

  close(form: NgForm) {
    form.resetForm({
      type: "Support"
    });

    $("#newTicket").modal("hide");
  }

  ticketSubmit(form: NgForm) {
    if (form.valid) {
      this.ticket.deviceInfo = navigator.userAgent;
      this.ticket.deviceWidth = window.innerWidth;
      this.ticket.deviceHeight = window.innerHeight;
      this.ticket.userLocation = this.companyServiceService.userLocation;
      AsyncApiCall.put('suportTicket', this.ticket)
        .subscribe(resp => {
          if (resp.statusCode == StatusCodes.codes.CREATED) {
            Notification.success("Support Ticket Raised!");
            this.newTicketAdded.emit(resp.data[0]);
            $(".close").click();
            form.resetForm({
              type: "Support"
            });
          } else {
            Notification.error(resp.message)
          }
        });
    } else {
      Notification.error("Please fill all required Fields!");
    }
  }
}
