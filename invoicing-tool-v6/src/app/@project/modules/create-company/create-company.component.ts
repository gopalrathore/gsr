import { StatusCodes } from '../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../@core/services/async-api-call';
import { FirebaseServiceService } from '../../../@core/services/firebase/firebase-service.service';
import { Notification, validations } from '../../../@core/utility-functions/utility-function';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyServiceService } from '../../../@core/services/company-service.service';


declare var swal: any;
declare var $: any;


interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

interface Company {
  company_registered: number;
  company_pan: string;
  company_email: string;
  company_name: string;
}

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})

export class CreateCompanyComponent implements OnInit {

  company: Company = {
    company_registered: 1,
    company_pan: "",
    company_email: "",
    company_name: ""
  };

  protected validate = new validations(this.company);
  @ViewChild('createCompany1') createCompany1;
  @ViewChild('createCompany2') createCompany2;
  private validForm: boolean = false;

  constructor(
    public firebaseServiceService: FirebaseServiceService,
    public companyServiceService: CompanyServiceService,
    private router: Router,
  ) {
    console.log("company list", companyServiceService.companies);

  }

  /**
   * @description add company to the user
   * @returns void
   */
  profileSubmit(): void {
    let user: object = this.firebaseServiceService.userDetails;
    if (user['uid']) {
      this.company['uid'] = user['uid'];
      AsyncApiCall.put('company', this.company).subscribe(resp => {
        console.log(resp);

        if (resp.statusCode === StatusCodes.codes.CREATED) {
          this.companyServiceService.getCompanies();
          AsyncApiCall.get('company', { company_id: resp.data[0].company_id }).subscribe(response => {
            console.log("response", response);
            this.companyServiceService.setCompany(response.data[0]);
            Notification.success('Changes Saved', 'top', 'right');
            this.router.navigate(['/inner-dashboard']);
          });
        } else {
          Notification.success(resp.message, 'top', 'right');
        }
      });
    }
  }

  ngOnInit() {
    console.log("list compny", this.companyServiceService.companies);


    // you can also use the nav-pills-[blue | azure | green | orange | red] for a different color of wizard
    let that = this;
    $('#wizardCard').bootstrapWizard({
      tabClass: 'nav nav-pills',
      nextSelector: '.btn-next',
      previousSelector: '.btn-back',
      onNext: function (tab, navigation, index) {
        if (index === 1) {
          that.createCompany1.ngSubmit.emit();
          $('#createCompany1').addClass('submitted');
        } else {
          that.createCompany2.ngSubmit.emit();
          $('#createCompany2').addClass('submitted');
        }

        if (!that.validForm) {
          return false;
        }

      },
      onInit: function (tab, navigation, index) {

        //check number of tabs and fill the entire row
        var $total = navigation.find('li').length;
        var $width = 100 / $total;

        var $display_width = $(document).width();

        if ($display_width < 600 && $total > 3) {
          $width = 50;
        }

        navigation.find('li').css('width', $width + '%');
      },
      onTabClick: function (tab, navigation, index) {
        // Disable the posibility to click on tabs
        return false;
      },
      onTabShow: function (tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index + 1;

        var wizard = navigation.closest('.card-wizard');

        // If it's the last tab then hide the last button and show the finish instead
        if ($current >= $total) {
          $(wizard).find('.btn-next').hide();
          $(wizard).find('.btn-finish').show();
        } else if ($current === 1) {
          $(wizard).find('.btn-back').hide();
        } else {
          $(wizard).find('.btn-back').show();
          $(wizard).find('.btn-next').show();
          $(wizard).find('.btn-finish').hide();
        }
      }
    });

  }
  ngAfterViewInit() {
    this.validate.validations();
  }

  validateCompany(valid, data) {
    this.validForm = valid;

  }

  setCountry(option) {
    if (option) {
      this.company['company_country'] = "India";
    }
  }

  select_company_type(gstin) {
    this.company['company_country'] = "India";
    this.company['company_gst_id'] = this.company['company_gst_id'].toUpperCase()
    this.company['company_pan'] = this.company['company_gst_id'].slice(2, 12);
    this.company['company_state_code'] = this.company['company_gst_id'].slice(0, 2);
    if (gstin.length > 5) {
      let gstin_type = gstin.slice(5, 6);
      gstin_type = gstin_type.toUpperCase()
      if (gstin_type === 'C')
        this.company['company_type'] = "Company";
      else if (gstin_type === 'P')
        this.company['company_type'] = "Sole Proprietor";
      else if (gstin_type === 'H')
        this.company['company_type'] = "Hindu Undivided Family";
      else if (gstin_type === 'F')
        this.company['company_type'] = "Partnership Firm";
      else if (gstin_type === 'A')
        this.company['company_type'] = "Association Of Persons";
      else if (gstin_type === 'T')
        this.company['company_type'] = "Trust";
      else if (gstin_type === 'B')
        this.company['company_type'] = "Body Of Individuals";
      else if (gstin_type === 'L')
        this.company['company_type'] = "Local Authority";
      else if (gstin_type === 'J')
        this.company['company_type'] = "Artificial Juridical Person";
      else if (gstin_type === 'G')
        this.company['company_type'] = "Government";
      else {
        this.company['company_type'] = '';
        Notification.error('Invalid GSTIN. Please try again')
        this.company['company_gst_id'] = gstin.slice(0, 5);
      }
    }
  }


}
