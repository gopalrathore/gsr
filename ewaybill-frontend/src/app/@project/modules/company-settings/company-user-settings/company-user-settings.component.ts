
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { validations } from '../../../../@core/utility-functions/functions/validations';
import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { Router } from '@angular/router';
import { TransfereService } from '../../../../@core/services/transfer.service';
import { createTable, DataTableButtons, DataTableLables } from '../../createTable';
import { StateList, StatusCodes } from '../../../../@core/dataset/dataset';
import { Notification } from '../../../../@core/utility-functions/utility-function';

declare var $: any;

interface Company {
  company_name: string;
  pan: string;
}

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-user-settings.component.html',
  styleUrls: ['./company-user-settings.component.css']
})

export class CompanyProfileComponent extends createTable implements OnInit {

  public company: Company = {
    company_name: '',
    pan: ''
  };

  public editCompany: Company = {
    company_name: '',
    pan: ''
  }

  public sameCompany: Company;

  public state: StateList = new StateList();


  protected validate: validations = new validations(this.company);

  constructor(
    protected companyServiceService: CompanyServiceService,
    protected transfereService: TransfereService,
    protected router: Router
  ) {
    super(companyServiceService, transfereService, router);
    this.dataTableSettings();
  }

  ngOnInit() {
    this.company = this.companyServiceService.getCompany();
    this.sameCompany = this.companyServiceService.getCompany();
  }

  ngAfterViewInit() {
    this.drawTable();
    this.validate.validations();
    $('.main-panel').animate({ scrollTop: 0 });
  }

  public editModal() {
    this.editCompany = JSON.parse(JSON.stringify(this.company));
    $('#edit-company').modal('show');
  }

  public dataTableSettings() {
    this.defineHeaders(['Sr No.', 'Display Name', 'GSTIN', 'State', 'No. of Branches', 'Action']);
    this.dataTableMessages = {
      searchPlaceholder: "Search GSTIN",
      dataSafe: "Your GSTIN is safe!",
      dataNotFound: "No GSTIN Added."
    };
    this.allAPIparams = {
      getTableData: "gst_id",
      deleteTableData: "gst_id",
      responseKeys: {
        primaryKey: "company_gst_id",
        nameKeyIndex: 1
      }
    };

    this.dataAttributes = {
      fields: ['company_gst_id', 'display_name', 'gstin', 'branches', 'status'],
      offset: 0,
      order: [{ ORDER_BY: "status", ORDER_TYPE: "ASC" }, { ORDER_BY: "inserted_ts", ORDER_TYPE: "DESC" }],
      limit: 1000
    };

    this.allRoutes = {
      editRoute: "edit-gstin"
    };
  }

  tableDataManupulator(index: number, jsonData: string): string {
    let dbtn: DataTableButtons = this.dataTableButtons;
    let dlbs: DataTableLables = this.dataTableLables;
    let data: any = JSON.parse(jsonData);


    let tempRow = [index,
      data['display_name'],
      data['gstin'],
      this.state.getStateName(data['gstin'].slice(0, 2)),
      data['branches'].length,
      data['status'] === '1' ? dbtn.editBtn + dbtn.deleteBtn : dlbs.disabled];

    return JSON.stringify(tempRow);
  }

  public newGSTINAdded() {
    this.router.navigate(['/create-GSTIN']).then(() => {
      this.router.navigate(['/settings']);
    });
    this.getTableData();
  }

  companyEdited() {
    this.company = this.companyServiceService.getCompany();
    this.sameCompany = this.companyServiceService.getCompany();
  }

  profileSubmit(isValid, data) {
    if (isValid) {
      AsyncApiCall.patch('company', data).subscribe((resp) => {
        if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
          AsyncApiCall.get('company', {}).subscribe(resp => {
            if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
              this.companyServiceService.setCompany(resp.data[0]);
              this.callPopUp();
              Notification.success("Data Saved");
              this.sameCompany = this.companyServiceService.getCompany();
            }
          });
        } else {
          Notification.error(resp.message);
        }
      });

    } else {
      Notification.error('Please Fill All Required Fields!');
    }
  }

  callPopUp() {
    $('.add-gstin').click();
  }
}
