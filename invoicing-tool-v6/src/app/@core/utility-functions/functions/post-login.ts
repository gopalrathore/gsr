import { CompanyServiceService } from "../../services/company-service.service";
import { Router } from "@angular/router";
import { AsyncApiCall } from "../../services/async-api-call";
import { StatusCodes } from "../../dataset/dataset";

export class PostLogin {

  constructor(protected companyServiceService: CompanyServiceService, protected router: Router, protected firebaseAuthObject) { }

  public loggedIn(userObj?:any){
    console.log("logged in");
    
    let user:object = userObj? userObj : this.firebaseAuthObject.currentUser;
    AsyncApiCall.view('company', {uid: user['uid'], FIELDS: ['company_id', 'company_name'], ORDER: {ORDER_BY: 'company_id'}, LIMIT: 50}).subscribe(resp => {
      if(resp.statusCode===StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
        this.companyServiceService.companies = resp.data;
        AsyncApiCall.get('company', {company_id: resp.data[0].company_id}).subscribe(response => {
          console.log("compay detail", response); 
          if(response.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
            this.companyServiceService.setCompany(response.data[0]);        
            this.router.navigate(['inner-dashboard']);
          }else {
            console.log("could not get company list");            
          }          
        });        
      }else {
        console.log("going to create company");
        this.router.navigate(['create-company']);
      }
    });
  }

}