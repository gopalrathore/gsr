import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class BillGenerationService {

  private userData:any = {
    username: "",
    userGstin: "",
    accountType: '',
    display_name: ''
  };


  constructor(private router:Router) { }

  /**
   * logout: Logging out user
   * @method getList
   */
  logout() {
    this.resetUserData();
    this.router.navigate(['ewaybill']);
  }

  getUserData(){
    if(this.userData.username===""){
      return false;
    }
    return this.userData;
  }

  resetUserData(){
    this.userData = {
      username: "",
      userGstin: "",
      accountType: '',
      display_name: ''
    }
  }

  setUserData(data){
    this.userData = data;
  }

}
