import { Notification } from '../../../@core/utility-functions/functions/notification';
import { AsyncApiCall } from '../../../@core/services/async-api-call';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { validations } from '../../../@core/utility-functions/functions/validations';
import { StateList, StatusCodes } from '../../../@core/dataset/dataset';
import { CompanyServiceService } from '../../../@core/services/company-service.service';
import { TransfereService } from '../../../@core/services/transfer.service';

declare var $: any;
declare var swal: any;
interface Branch {
  branch_name: string;
  branch_address: string;
  branch_city: string;
  branch_pincode: string;
  branch_id: string;
  company_gst_id: string;
}
interface GstinData {
  gstin: string;
  company_gst_id?: string;
  display_name: string;
  branches?: Branch[]
}

@Component({
  selector: 'app-edit-gstin',
  templateUrl: './edit-gstin.component.html',
  styleUrls: ['./edit-gstin.component.css']
})
export class EditGstinComponent implements OnInit {

  protected companyGSTid: number = this.transfereService.getData();

  public addBranch: Branch = {
    branch_id: '',
    branch_name: '',
    company_gst_id: '',
    branch_address: '',
    branch_city: '',
    branch_pincode: ''
  }

  public gstinData: GstinData = {
    gstin:'',
    display_name: '',
  };
  protected validate = new validations(this.gstinData);

  public state: StateList = new StateList();

  constructor(private transfereService: TransfereService, protected router: Router) {
    console.log("company gstid",this.companyGSTid);
    
    if (this.companyGSTid) {
      this.getGSTIDData();
    }
    else {
      console.log("routing from here");
      
      this.router.navigateByUrl('/settings/profile');
    }
  }

  public addbranch() {
    this.addBranch.company_gst_id = this.gstinData.company_gst_id;
    this.addBranch.branch_id = '';
    $('#addBranch').modal('show');
  }

  public editBranch(branch: Branch) {
    this.addBranch.branch_address = branch.branch_address;
    this.addBranch.branch_city = branch.branch_city;
    this.addBranch.branch_id = branch.branch_id;
    this.addBranch.branch_name = branch.branch_name;
    this.addBranch.branch_pincode = branch.branch_pincode;
    this.addBranch.company_gst_id = branch.company_gst_id;

    $('#addBranch').modal('show');
  }

  public deleteBranch(id: string, name: string) {
    let data = {
      branch_id: id,
      company_gst_id: this.gstinData['company_gst_id']
    };
    let that = this;
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover ' + name + ' !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false
    }).then(function () {
      AsyncApiCall.delete('branch', data).subscribe(resp => {
        if (resp['statusCode'] === StatusCodes.codes.ACCEPTED) {
          swal({
            title: 'Deleted!',
            text: name + ' has been deleted.',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
          })
          that.getGSTIDData();
        }
      });

    }, function (dismiss) {
      if (dismiss === 'cancel') {
        swal({
          title: 'Cancelled',
          text: 'Your Branch is Safe',
          type: 'error',
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false
        })
      }
    });
  }

  ngOnInit() {
    // $("#addBranch").appendTo("body");
  }

  ngOnDestroy() {
    // $("body>#addBranch").remove();
  }

  ngAfterViewInit() {
    this.validate.validations();
  }

  private getGSTIDData() {
    AsyncApiCall.view('gst_id', { FIELDS: ['company_gst_id', 'company_id', 'gstin', 'display_name', 'status', 'insert_date', 'branches'], ORDER: [{ ORDER_BY: "status", ORDER_TYPE: "ASC" }, { ORDER_BY: "inserted_ts", ORDER_TYPE: "DESC" }], LIMIT: 1000 }).subscribe(resp => {
      if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        this.gstinData = resp.data[0];
      } else {
        console.log("gstin data not found");

      }

    });
  }

  public branchEdited() {
    this.getGSTIDData();
  }

  public gstinSubmit(isValid: boolean) {
    if (isValid) {
      AsyncApiCall.patch('gst_id', this.gstinData).subscribe((resp) => {
        if (resp.statuscode === StatusCodes.codes.ACCEPTED) {
          Notification.success('GSTIN Detail Saved!');
        } else {
          Notification.error(resp.message);
        }
      });
    } else {
      Notification.error('Please Fill All Required Filed!');
    }
  }

}
