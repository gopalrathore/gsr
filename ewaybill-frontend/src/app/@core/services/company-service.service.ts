import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase";


@Injectable()
export class CompanyServiceService {

  public GSTINList: Array<object> = [];


  // apiCalls = new ApiCalls(this.router, this.http);
  // masterLink = this.apiCalls.masterlink;
  // xlLink = this.apiCalls.xlLink;


  public company_id: string;
  private firebaseAuthObject: any;

  constructor(
    public router: Router,
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDKweRfOuGIBEsp1UjTXFVcLMQAtQ83fs0",
        authDomain: "ewaybill-a97ed.firebaseapp.com",
        databaseURL: "https://ewaybill-a97ed.firebaseio.com",
        projectId: "ewaybill-a97ed",
        storageBucket: "ewaybill-a97ed.appspot.com",
        messagingSenderId: "208973412743"
      });
    }
    this.firebaseAuthObject = firebase.auth();
    console.log("company service init", this.firebaseAuthObject.currentUser);

    let company: any = localStorage.getItem('selectedCompany');
    company = JSON.parse(company);

    if (company != null) {
      company = company['company_id'];
      this.setCompanyId(company);
    }

    if (router.url.slice(0, 9) != '/register') this.setToken();

  }

  /**
   * @description set token of the user
   */
  public setToken() {
    let key = localStorage.getItem("ewaybill-tool-v2.0.1");
    if (key === undefined || key === null) {
      console.log("no token found", key);
      this.firebaseAuthObject.signOut().then(() => {
        this.router.navigate(['login']);
      }).catch(error => {
        console.log("can not signOut because ", error.code);
      });
    }
  }

  setXLLink(): string {
    return '';
  }

  setCompany(company: any) {
    if (company.company_id) this.setCompanyId(company.company_id);
    localStorage.removeItem("selectedCompany");
    localStorage.setItem("selectedCompany", JSON.stringify(company));
  }

  getCompany(): any {
    let selectedCompany = localStorage.getItem("selectedCompany");
    if (selectedCompany === null) {
      
      this.firebaseAuthObject.signOut().then(() => {
        this.router.navigate(['login']);
      }).catch(error => {
        console.log("can not signOut because ", error.code);
      });
      return {
        company_name: '',
        pan: ''
      };
    } else
      return JSON.parse(selectedCompany);
  }

  private setCompanyId(id: string) {
    this.company_id = id;
  }

}