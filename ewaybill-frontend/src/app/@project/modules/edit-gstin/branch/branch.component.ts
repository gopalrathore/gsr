import { Notification } from '../../../../@core/utility-functions/functions/notification';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';

import { validations } from '../../../../@core/utility-functions/functions/validations';

import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { StateList, StatusCodes } from '../../../../@core/dataset/dataset';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';

declare var $: any;
interface Branch {
  branch_name: string;
  branch_address: string;
  branch_city: string;
  branch_pincode: string;
  branch_id: string;
  company_gst_id: string;
}

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  public state: StateList = new StateList();

  @Input() addBranch: Branch = {
    branch_id: '',
    branch_name: '',
    company_gst_id: '',
    branch_address: '',
    branch_city: '',
    branch_pincode: ''
  };

  protected validate: validations = new validations(this.addBranch);

  @Output() branchEdited = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.validate.validations();
  }

  public close(form: NgForm) {
    $('#addBranch').modal('hide')
    form.resetForm({
      branch_id: '',
      branch_name: '',
      company_gst_id: '',
      branch_address: '',
      branch_city: '',
      branch_pincode: ''
    });
  }

  public branchSubmit(form: NgForm) {
    if (form.valid) {
      let method = 'patch';

      if (this.addBranch.branch_id === undefined || this.addBranch.branch_id === null || this.addBranch.branch_id === '') {
        method = 'put';
      }

      AsyncApiCall[method]('branch', this.addBranch).subscribe((resp) => {
        if (resp.statusCode === StatusCodes.codes.ACCEPTED || resp.statusCode === StatusCodes.codes.CREATED) {
          this.branchEdited.emit();
          $('#addBranch').modal('hide');
          form.resetForm();
          delete this.addBranch.branch_id;
        } else {
          Notification.error(resp.message);
        }

      });
    } else {
      Notification.error('Please Fill All Required Fields!');
    }

  }

}
