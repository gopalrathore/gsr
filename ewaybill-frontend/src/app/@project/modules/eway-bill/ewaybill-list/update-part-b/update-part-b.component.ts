import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Notification } from '../../../../../@core/utility-functions/functions/notification';
import { updateObj } from '../ewaybill-list.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { StateList, ErrorList } from '../../../../../@core/dataset/dataset';
import { validations } from '../../../../../@core/utility-functions/functions/validations';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';
import { BillGenerationService } from '../../../../../@core/services/bill-generation.service';

declare var $: any;

@Component({
  selector: 'app-update-part-b',
  templateUrl: './update-part-b.component.html',
  styleUrls: ['./update-part-b.component.css']
})
export class UpdatePartBComponent implements OnInit {

  @Input() updateData: updateObj = {
    Username: '',
    data: {
      EwbNo: '',
      FromPlace: '',
      FromState: '',
      TransDocDate: '',
      TransDocNo: '',
      TransMode: '',
      VehicleNo: '',
      ReasonCode: "",
      ReasonRem: ""
    }
  };

  public saveBtnText = 'Update';

  public state = new StateList();

  protected validate = new validations(this.updateData);

  @Output() partBUpdated = new EventEmitter();
  private errorList = new ErrorList();

  constructor(
    private companyServiceService: CompanyServiceService,
    private billGenerationService: BillGenerationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.validate.validations();
  }

  /**
   * [convertDate to convert new Date() formate to dd/mm/yyyy]
   * @param  inputFormat [js date object which needs to be changed]
   * @return             [string date in dd/mm/yyyy format]
   */
  convertDate(inputFormat) {
    if (isNaN(Date.parse(inputFormat))) {
      return inputFormat;
    }

    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  }

  /**
   * [close to close the modal and reset the form]
   * @param form [form to be closed]
   */
  close(form: NgForm):void {
    $('#updatePartB').modal('hide')
    form.resetForm({
      Username: '',
      data: {
        EwbNo: '',
        FromPlace: '',
        FromState: '',
        TransDocDate: '',
        TransDocNo: '',
        TransMode: '',
        VehicleNo: '',
        ReasonCode: "",
        ReasonRem: ""
      }
    });
  }

  /**
   * [partBSubmit to submit partb form]
   * @param form [form object]
   */
  partBSubmit(form: NgForm):void {
    if (form.valid) {
      let dataToSend: any = this.updateData;
      this.saveBtnText = "Updating";

      setTimeout(() => {
        this.saveBtnText = "Update";
      }, 30000);

      dataToSend.data.TransDocDate = this.convertDate(dataToSend.data.TransDocDate);
      dataToSend.data.EwbNo = Number(dataToSend.data.EwbNo);
      dataToSend.data.FromState = Number(dataToSend.data.FromState);
      dataToSend.data.ReasonCode = Number(dataToSend.data.ReasonCode);
      dataToSend.data.TransMode = Number(dataToSend.data.TransMode);
      AsyncApiCall.post('WebUpdateBill', dataToSend).subscribe((resp) => {
        this.saveBtnText = "Update";

        let response = JSON.parse(resp.status);

        if (response.errorCodes) {
          console.log("updated resp", response);
          response = response.errorCodes.split(",");
          response.map((item, i) => {
            if (item === "") {
              response.splice(i, 1);
            }
          });

          if (response.includes('101') || response.includes('102') || response.includes('107') || response.includes('108') || response.includes('238')) {
            Notification.error("Session expired, Login again!");
            this.billGenerationService.resetUserData();
            $('#updatePartB').modal('hide');
            this.router.navigate(['ewaybill']);
            return false;
          }
          response.map((item) => {
            try {
              Notification.error(this.errorList.codes[item].msg);
            } catch (error) {
              Notification.error("Something went Wrong!");
            }

          });

        } else {
          this.partBUpdated.emit('updated success');
          $('#updatePartB').modal('hide');
          form.resetForm({
            Username: '',
            data: {
              EwbNo: '',
              FromPlace: '',
              FromState: '',
              TransDocDate: '',
              TransDocNo: '',
              TransMode: '',
              VehicleNo: '',
              ReasonCode: "",
              ReasonRem: ""
            }
          });
          Notification.success("Successfully Updated!");
        }

      }, (err) => {
        Notification.error("Try Again, Something went wrong!");
      });


    } else {
      Notification.error('Please Fill All Required Fields!');
    }

  }

}
