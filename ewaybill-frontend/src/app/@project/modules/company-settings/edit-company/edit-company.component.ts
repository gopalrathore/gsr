import { Notification } from '../../../../@core/utility-functions/functions/notification';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { StatusCodes } from '../../../../@core/dataset/dataset';

declare var $: any;

interface Company {
  company_name: string;
  pan: string;
}

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  @Input() editCompany: Company = {
    company_name: '',
    pan: ''
  }

  @Output() companyEdited = new EventEmitter();

  constructor(private companyServiceService: CompanyServiceService) { }

  ngOnInit() { }

  public profileEditSubmit(form: NgForm) {
    if (form.valid) {

      AsyncApiCall.patch('company', this.editCompany).subscribe((resp) => {
        if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
          AsyncApiCall.get('company', {}).subscribe(resp => {
            if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
              this.companyServiceService.setCompany(resp.data[0]);
              $('#edit-company').modal('hide');
              Notification.success('Data Saved');
              this.companyEdited.emit(resp.message);
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

  public close(form: NgForm) {
    $('#edit-company').modal('hide')
    form.resetForm();
    this.editCompany = {
      company_name: '',
      pan: ''
    }
  }

}
