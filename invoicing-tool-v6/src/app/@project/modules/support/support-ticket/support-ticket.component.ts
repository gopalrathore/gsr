import { StatusCodes } from '../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { Router } from "@angular/router";
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { Component, OnInit } from "@angular/core";
import { TransfereService } from "../../../../@core/services/transfer.service";

declare var $: any;
declare var swal: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: "app-support-ticket",
  templateUrl: "./support-ticket.component.html",
  styleUrls: ["./support-ticket.component.css"]
})
export class SupportTicketComponent implements OnInit {
  supportTickets;

  constructor(
    private companyServiceService: CompanyServiceService,
    private transfereService: TransfereService,
    private router: Router
  ) {
    this.getSupportTicket();
  }

  public dataTable: DataTable;
  private dataID = [];

  ngOnInit() {
    this.dataTable = {
      headerRow: ["#", "Subject", "Date", "Status", "Action"],
      footerRow: ["#", "Subject", "Date", "Status", "Action"],
      dataRows: []
    };
  }

  getSupportTicket() {
    AsyncApiCall.view('supportTicket', {
      FIELDS: ["support_id", "subject", "resolved", "inserted_ts"],
      LIMIT: 1,
      OFFSET: 0,
      ORDER: [{
      ORDER_BY: "inserted_ts",
      ORDER_TYPE: "DESC"}]
    })
      .subscribe(resp => {
        console.log("resp", resp);
        
        if (resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
          this.supportTickets = resp.data;
          var datatable = $("#datatables").DataTable();
          var newdata = [];
          var temp = [];
          this.dataID = [];

          for (let i = 0; i < resp.data.length; i++) {
            temp = [
              i + 1,
              resp.data[i]["subject"],
              resp.data[i]["resolved"],
              resp.data[i]["insert_date"],
              '<button class="btn btn-simple btn-danger btn-icon escalate">Escalate</button>'
            ];
            newdata.push(temp);
            this.dataID.push(parseInt(resp.data[i]["support_id"]));
          }
          datatable.clear().draw();
          datatable.rows.add(newdata); // Add new data
          datatable.columns.adjust().draw(); // Redraw the DataTable
        }else {
          console.log("support ticket not found or loaded");          
        }
      });
  }

  ngAfterViewInit() {
    let that = this;
    $("#datatables").DataTable({
      pagingType: "full_numbers",
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search Ticket"
      }
    });

    var table = $("#datatables").DataTable();
    // Edit record
    table.on("click", ".escalate", function() {
      var $tr = $(this).closest("tr");
      var data = table.row($tr).data();
      var support_id = that.dataID[parseInt(data[0]) - 1];
      let escalate_data = {
        support_id: support_id
      };

      that.escalate(escalate_data);
    });
  }

  newTicketAdded(data) {
    this.getSupportTicket();
  }

  escalate(data) {
    let that = this;
    swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Escalate it!",
      cancelButtonText: "No",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false
    }).then(
      function() {
        // that.companyServiceService
        //   .sendToAPI(data, "escalate_support_ticket", true)
        //   .subscribe(resp => {
        //     if (resp["status"] == 1) {
        //       swal({
        //         title: "Escalated!",
        //         text: "We will soon get back to you!",
        //         type: "success",
        //         confirmButtonClass: "btn btn-success",
        //         buttonsStyling: false
        //       });
        //     }
        //   });
      },
      function(dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === "cancel") {
          swal({
            title: "Cancelled",
            type: "error",
            confirmButtonClass: "btn btn-info",
            buttonsStyling: false
          });
        }
      }
    );
  }
}
