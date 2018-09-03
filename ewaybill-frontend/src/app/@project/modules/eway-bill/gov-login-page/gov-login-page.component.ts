import { Notification } from '../../../../@core/utility-functions/functions/notification';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { BillGenerationService } from '../../../../@core/services/bill-generation.service';
import { StatusCodes } from '../../../../@core/dataset/dataset';

@Component({
  selector: 'app-gov-login-page',
  templateUrl: './gov-login-page.component.html',
  styleUrls: ['./gov-login-page.component.css']
})
export class GovLoginPageComponent implements OnInit {

  public gst_id_list:any[] = [];

  public loginData:any = {
    username: "05AAACI1593H1ZQ",
    password: "abc123@@",
    userGstin: "05AAACI1593H1ZQ",
    accountType: 'B'
  }

  public saveBtnText = "Login"

  constructor(
    private companyServiceService:CompanyServiceService,
    private router:Router,
    private billGenerationService:BillGenerationService
  ) { }

  ngOnInit() {
    if(this.billGenerationService.getUserData()){
      this.router.navigate(['ewaybill','e-way-bill-list']);
    }else
    this.getGSTid();
  }

  /**
   * [get list of all the gstid]
   */
  getGSTid():void{
    AsyncApiCall.view('gst_id', {}).subscribe((resp)=>{
      if(resp.status===1){
        if(resp.data.length===0){
          this.router.navigateByUrl('settings/profile');
        }else
        this.gst_id_list = resp.data;      
      }
    });
  }

  /**
   * [login to gov portal]
   * @param form [form object to be submited]
   */
  login(form: NgForm):void{
    
    if(form.valid===true){
      
      this.saveBtnText = "Logging you in";

      setTimeout(() => {
        this.saveBtnText = "Login";        
      }, 30000);

      this.router.navigate(['ewaybill','e-way-bill-list']);

      
      // let selectedGstin = this.gst_id_list.filter((item)=>{
      //   return item.gstin===this.loginData.userGstin
      // });
      // AsyncApiCall.post("WebAuthData", this.loginData).subscribe(resp=>{  

      //   if(resp.statusCode === StatusCodes.codes.OK){
      //     this.saveBtnText = "Login";
      //     delete this.loginData.password;
      //     this.loginData['display_name'] = selectedGstin[0].display_name;
      //     this.billGenerationService.setUserData(this.loginData);
      //     this.router.navigate(['ewaybill','e-way-bill-list']);       
      //   }else {
      //     this.saveBtnText = "Login";
      //     Notification.error("Invalid Username or Password!");
      //   }

      // }, err => {
      //   this.saveBtnText = "Login";
      //   Notification.error("Try again, Something went wrong!");   
      // });
    }else {
      this.saveBtnText = "Login";
      Notification.error("Please fill all the required Fields!");
    }
}

}
