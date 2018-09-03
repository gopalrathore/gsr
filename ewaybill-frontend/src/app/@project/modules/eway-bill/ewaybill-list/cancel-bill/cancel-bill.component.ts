import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Notification } from '../../../../../@core/utility-functions/functions/notification';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorList } from '../../../../../@core/dataset/dataset';
import { validations } from '../../../../../@core/utility-functions/functions/validations';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';
import { BillGenerationService } from '../../../../../@core/services/bill-generation.service';

declare var $: any;

@Component({
  selector: 'app-cancel-bill',
  templateUrl: './cancel-bill.component.html',
  styleUrls: ['./cancel-bill.component.css']
})

export class CancelBillComponent implements OnInit {

  public cancelData = {
    cancelRsnCode: "",
    cancelRmrk: ""
  };

  private errorList = new ErrorList();

  @Input() EWBnumber = "";
  @Output() billCanceled = new EventEmitter();

  private userData: any;

  protected validate = new validations(this.cancelData, this.constructor.name);

  constructor(
    private companyServiceService: CompanyServiceService,
    private billGenerationService: BillGenerationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userData = this.billGenerationService.getUserData();
  }

  ngAfterViewInit() {
    this.validate.validations();
  }

  /**
   * [close the modal and reset the form]
   * @param form [form to be closed]
   */
  close(form: NgForm):void {
    $('#billCancel').modal('hide')
    form.resetForm();
  }

  /**
   * [cancelBill to cancel e way bill]
   * @param form [form object]
   */
  cancelBill(form: NgForm):void {
    if (form.valid) {
      this.cancelData['ewayBillNo'] = this.EWBnumber;
      this.cancelData['Username'] = this.userData.username;
      AsyncApiCall.post('WebCancelBill', this.cancelData).subscribe((resp) => {
        let response = JSON.parse(resp.data);
        if (response.ewayBillNo) {
          Notification.success("E-Way Bill canceled successfully!");
          this.billCanceled.emit('cancelled');
          $('#billCancel').modal('hide');
          form.resetForm();
        } else {
          response = response.errorCodes.split(",");
          response.map((item, i) => {
            if (item === "") {
              response.splice(i, 1);
            }
          });

          if (response.includes('101') || response.includes('102') || response.includes('107') || response.includes('108') || response.includes('238')) {
            $('#billCancel').modal('hide');
            Notification.error("Session expired, Login again!");
            this.billGenerationService.resetUserData();
            this.router.navigate(['ewaybill']);
            return false;
          }
          response.map((item) => {
            try {
              Notification.error(this.errorList.codes[item].msg);
            } catch (error) {
              Notification.error("Something went wrong!");
            }
          });

        }

      }, (err) => {
        Notification.error('Something went wrong, Try again!');
      });
    } else {
      Notification.error('Please Fill All Required Fields!');
    }

  }

}
