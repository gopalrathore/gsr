import { Notification } from '../../../@core/utility-functions/functions/notification';
import { AsyncApiCall } from '../../../@core/services/async-api-call';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { StateList, StatusCodes } from '../../../@core/dataset/dataset';
import { validations } from '../../../@core/utility-functions/functions/validations';
import { CompanyServiceService } from '../../../@core/services/company-service.service';
import { TransfereService } from '../../../@core/services/transfer.service';

declare var $: any;

interface Company {
  company_name: string;
  pan: string;
}
interface Branch {
  branch_name: string;
  branch_address: string;
  branch_city: string;
  branch_pincode: string;
  branch_id?: string;
  company_gst_id?: string;
  branch_state?: string;
}

@Component({
  selector: 'app-inner-dashboard',
  templateUrl: './inner-dashboard.component.html',
  styleUrls: ['./inner-dashboard.component.css']
})
export class InnerDashboardComponent implements OnInit {

  public gst_id_list: any;
  branch: Branch[] = [];
  addBranch: Branch = {
    company_gst_id: '',
    branch_name: '',
    branch_state: '',
    branch_address: '',
    branch_city: '',
    branch_pincode: '',
    branch_id: '',
  };

  public currentCompany: Company = {
    company_name: '',
    pan: ''
  };

  public state: StateList = new StateList();
  // currentGSTIN = {};

  protected validate: validations = new validations(this.addBranch);

  // currentCompany = this.companyServiceService.currentCompany.subscribe(currentCompany=>this.currentCompany = currentCompany);

  constructor(private companyServiceService: CompanyServiceService, private transfereService: TransfereService, private router: Router) {
    this.getGSTid();
  }

  ngOnInit() {
    this.quickAdd();
    $('.main-panel').animate({ scrollTop: 0 });
    this.currentCompany = this.companyServiceService.getCompany();
  }

  ngOnDestroy() {
    // $("body>#addBranch").remove();
    // $("body>#newGSTIN").remove();
  }

  quickAdd() {
    let add = localStorage.getItem('quickAdd');

    localStorage.removeItem('quickAdd');

    if (add != undefined && add != null) {
      if (add === '1') {
        $('#newGSTIN').modal('show');
      } else if (add === '2') {
        $('#addBranch').modal('show');
      }
    }
  }

  gstinSelected(companygstid: string) {
    let gstin = this.gst_id_list.find((item) => {
      return item.company_gst_id === companygstid;
    });

    this.addBranch.branch_state = gstin.gstin.slice(0, 2);

  }

  importFile(company_gst_id: string, branch_id: string) {
    AsyncApiCall.put('session', {}).subscribe((resp) => {
      if (resp.statusCode === StatusCodes.codes.CREATED) {
        let data = {
          company_gst_id: company_gst_id,
          branch_id: branch_id,
        }
        localStorage.setItem('session_id', resp.data[0].session_id);
        this.transfereService.setData(data);
        this.router.navigate(['/import']);
      } else {
        Notification.error('Something Went Wrong!');
      }

    });

  }

  close(form: NgForm) {
    $('#addBranch').modal('hide')
    form.resetForm({
      branch_name: '',
      company_gst_id: '',
      branch_address: '',
      branch_city: '',
      branch_pincode: ''
    });
    this.addBranch = {
      branch_name: '',
      company_gst_id: '',
      branch_address: '',
      branch_city: '',
      branch_pincode: ''
    }
  }

  branchSubmit(form: NgForm) {
    if (form.valid) {
      AsyncApiCall.put('branch', form.value).subscribe((resp) => {
        if (resp.statusCode === StatusCodes.codes.CREATED) {
          $('#addBranch').modal('hide');
          form.resetForm({
            branch_name: '',
            company_gst_id: '',
            branch_address: '',
            branch_city: '',
            branch_pincode: ''
          });
          this.addBranch = {
            branch_name: '',
            company_gst_id: '',
            branch_address: '',
            branch_city: '',
            branch_pincode: ''
          };
          this.getGSTid();
        } else {
          Notification.error(resp.message);
        }
      });
    } else {
      Notification.error('Please Fill All Fields!');
    }

  }

  BranchImportHistory(branch_id, company_gst_id, branch_name) {
    let data = {
      company_gst_id: company_gst_id,
      branch_id: branch_id,
      branch_name: branch_name
    }

    this.transfereService.setData(data);
    this.router.navigate(['import', 'import-history']);
  }

  getGSTid() {
    AsyncApiCall.view('gst_id', { FIELDS: ['company_gst_id', 'company_id', 'gstin', 'display_name', 'status', 'insert_date', 'branches'], ORDER: [{ ORDER_BY: "status", ORDER_TYPE: "ASC" }, { ORDER_BY: "inserted_ts", ORDER_TYPE: "DESC" }], LIMIT: 1000 }).subscribe((resp) => {
      if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        if (resp.data.length === 0) {
          this.router.navigateByUrl('settings/profile');
        } else
          this.gst_id_list = resp.data;
      } else if (resp.statusCode === StatusCodes.codes.NOT_FOUND) {
        this.router.navigateByUrl('settings/profile');
      }

    });
  }

  public newGSTINAdded() {
    this.getGSTid();
  }

  public allBillsBranch(branch_id: string, company_gst_id:string) {
    let data = {
      branch_id: branch_id,
      company_gst_id: company_gst_id
    };
    this.transfereService.setData(data);
    this.router.navigate(['import', 'all-e-way-bills']);
  }

  public allBillsgstid(id: string) {
    let data = {
      company_gst_id: id
    };
    this.transfereService.setData(data);
    this.router.navigate(['import', 'all-e-way-bills']);
  }

  ngAfterViewChecked() {
    $('[rel="tooltip"]').tooltip();
  }

  ngAfterViewInit() {
    this.validate.validations();
  }

}
