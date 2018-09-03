import { Router } from '@angular/router';
import { CompanyServiceService } from '../../services/company-service.service';
import { AsyncApiCall } from '../../services/async-api-call';
import { StatusCodes } from '../../dataset/dataset';

export class Login {

  constructor(protected companyServiceService: CompanyServiceService, protected router: Router, protected firebaseAuthObject) { }

  public login(user: any) {


    this.setLoginToken({
      "displayName": user.displayName,
      "firebase_uid": user.uid,
      "email": user.email
    }).then(resp => {
      return this.getCompanyId();
    }, err => {
      console.log(err);
    }).then(resp => {
      return this.generateCompanyToken(resp);
    }, err => {
      console.log(err);
    }).then(resp => {
      return this.getCompanyDetail();
    }, err => {
      console.log(err);
    }).then(resp => {
      console.log("company detail", resp);
      if (resp['data'][0].company_name === undefined || resp['data'][0].company_name === "") {
        this.router.navigate(["create-GSTIN"]);
      } else {
        this.companyServiceService.setCompany(resp['data'][0]);
        this.getGstIdList();
        this.router.navigate(["dashboard"]);
      }
    }, err => {
      console.log("inside err", err);
    }).catch(err => {
      console.log(err);
    });

  }


  private setLoginToken(user: any) {
    let loginToken = new Promise((resolve, reject) => {
      AsyncApiCall.post('notify_login', user).subscribe(resp => {
        if (resp.statusCode === StatusCodes.codes.ACCEPTED || resp.statusCode === StatusCodes.codes.CREATED) {
          localStorage.setItem('ewaybill-tool-v2.0.1', resp.data[0]['token']);
          resolve('token generated');
        } else {
          this.firebaseAuthObject.signOut();
          reject("token not generated");
        }
      });
    });
    return loginToken;
  }

  private getCompanyList() {
    let companyListPromise = new Promise((resolve, reject) => {
      AsyncApiCall.view('company', {}).subscribe(resp => {     
        if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION || resp.statusCode === StatusCodes.codes.NOT_FOUND) {
          let companyId = resp.data.length>0 ? resp.data[0].company_id : '';
          resolve({ statusCode: resp.statusCode, data: companyId });
        } else {
          reject("Company list not working");
        }
      });
    });
    return companyListPromise;
  }

  private getGstIdList() {
    AsyncApiCall.view('gst_id', { FIELDS: ['company_gst_id', 'company_id', 'gstin', 'display_name', 'status', 'insert_ts', 'branches'], ORDER: [{ ORDER_BY: "status", ORDER_TYPE: "ASC" }, { ORDER_BY: "inserted_ts", ORDER_TYPE: "DESC" }], LIMIT: 1000 }).subscribe(resp => {
      this.companyServiceService.GSTINList = resp.data;
    });
  }

  private getCompanyId() {
    return this.getCompanyList().then(resp => {
      console.log("here", resp);        
      if (resp['statusCode'] === StatusCodes.codes.NOT_FOUND) {
        return this.createCompany();
      } else {
        return new Promise((resolve, reject) => {
          resolve(resp['data']);
        });
      }
    }, err => {
      console.log(err);
    })

  }

  private generateCompanyToken(id: any) {
    console.log("company id", id);

    let companyTokenPromise = new Promise((resolve, reject) => {
      AsyncApiCall.post('get_company_token', {
        company_id: id
      }).subscribe(resp => {
        if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
          localStorage.removeItem('ewaybill-tool-v2.0.1');
          localStorage.setItem('ewaybill-tool-v2.0.1', resp.data[0]['token']);
          resolve('token generated');
        } else {
          reject("company token not generated");
        }
      });
    });
    return companyTokenPromise;
  }

  private createCompany() {
    let newCompany = new Promise((resolve, reject) => {
      AsyncApiCall.put('company', {}).subscribe(resp => {
        if (resp.statusCode === StatusCodes.codes.CREATED) {
          resolve(resp.data[0].company_id);
        } else {
          reject("New company not created");
        }
      });
    });
    return newCompany;
  }

  private getCompanyDetail() {
    let companyDetail = new Promise((resolve, reject) => {
      AsyncApiCall.get('company', {}).subscribe(resp => {
        if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
          resolve(resp);
        } else {
          reject("company detail not found");
        }
      });
    });
    return companyDetail;
  }
}