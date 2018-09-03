import { HelperFunction } from './../../../../../@core/utility-functions/functions/helper-function';
import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { StatusCodes } from '../../../../../@core/dataset/dataset';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  public logo: string = "http://placehold.it/100x100";

  public currentCompany: any = this.companyServiceService.currentCompany.subscribe(currentCompany => this.currentCompany = currentCompany);

  constructor(private companyServiceService: CompanyServiceService) { }

  ngOnInit() {
    this.currentCompany = this.companyServiceService.getCompany();
    this.currentCompany.company_logo = this.currentCompany.company_logo === null || this.currentCompany.company_logo === '' ? 'https://placehold.it/150x160' : this.currentCompany.company_logo;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

      HelperFunction.getBase64(file, (result) => {
        let n = result.indexOf(",");
        let base64Data = result.slice(n + 1);
        AsyncApiCall.uploadDoc({ body: { base64String: base64Data, location: "logo" } }).subscribe(resp => {
          if (resp.statusCode === StatusCodes.codes.OK) {
            this.logo = resp.data.path;
            AsyncApiCall.patch('company', { company_logo: resp.data.path, company_id: this.companyServiceService.company_id }).subscribe(resp => {
              if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
                console.log("file send to database");
                let company = this.companyServiceService.getCompany();
                company.company_logo = this.logo;
                this.companyServiceService.setCompany(company);
                this.currentCompany = this.companyServiceService.getCompany();
              } else {
                console.log("file not sent to database");
              }
            })

          } else {
            console.log("file not uploaded");
          }
          this.companyServiceService.getCompanies();        
        })
      })
    }
  }





}
