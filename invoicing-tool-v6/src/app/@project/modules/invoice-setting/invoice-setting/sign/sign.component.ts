import { HelperFunction } from "./../../../../../@core/utility-functions/functions/helper-function";
import { CompanyServiceService } from "../../../../../@core/services/company-service.service";
import { AsyncApiCall } from "../../../../../@core/services/async-api-call";
import { Component, OnInit } from "@angular/core";
import { StatusCodes } from "../../../../../@core/dataset/dataset";

@Component({
  selector: "app-sign",
  templateUrl: "./sign.component.html",
  styleUrls: ["./sign.component.css"]
})
export class SignComponent implements OnInit {
  public sign: string = "http://placehold.it/100x100";
  public currentCompany: any = this.companyServiceService.currentCompany.subscribe(
    currentCompany => (this.currentCompany = currentCompany)
  );

  constructor(private companyServiceService: CompanyServiceService) {}

  ngOnInit() {
    this.currentCompany = this.companyServiceService.getCompany();
    this.currentCompany.company_sign =
      this.currentCompany.company_sign === null ||
      this.currentCompany.company_sign === ""
        ? "https://placehold.it/150x160"
        : this.currentCompany.company_sign;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      HelperFunction.getBase64(file, result => {
        let n = result.indexOf(",");
        let base64Data = result.slice(n + 1);
        AsyncApiCall.uploadDoc({
          body: { base64String: base64Data, location: "sign" }
        }).subscribe(resp => {
          if (resp.statusCode === StatusCodes.codes.OK) {
            console.log("gopal resp", resp);
            this.sign = resp.data.path;
            AsyncApiCall.patch("company", {
              company_sign: resp.data.path,
              company_id: this.companyServiceService.company_id
            }).subscribe(resp => {
              if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
                console.log("file send to database");
                console.log("current company",this.companyServiceService.getCompany());
                let company = this.companyServiceService.getCompany();
                company.company_sign = this.sign;
                this.companyServiceService.setCompany(company);
                this.currentCompany = this.companyServiceService.getCompany();
              } else {
                console.log("file not sent to database");
              }
            });
          } else {
            console.log("file not uploaded");
          }
        });
      });
    }
  }
}
