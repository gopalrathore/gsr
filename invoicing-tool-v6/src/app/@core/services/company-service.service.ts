import { SyncApiCall } from './sync-api-call';
import { AsyncApiCall } from './async-api-call';

import { PrefrencesService } from "./prefrences/prefrences.service";
import { Router } from "@angular/router";

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { WhiteLabelFeatures } from "../dataset/whitelabel/whitelabel";
import * as firebase from "firebase";
import { StatusCodes } from '../dataset/dataset';
import { AngularFireAuth } from 'angularfire2/auth';
import { HelperFunction } from '../utility-functions/utility-function';



@Injectable()
export class CompanyServiceService {
  private companySource = new BehaviorSubject<object>({
    company_name: "",
    company_logo: "https://placehold.it/100x100"
  });
  public currentCompany = this.companySource.asObservable();
  // private firebaseAuthObject;


  private key:string;

  public whiteLabelFeatures: WhiteLabelFeatures = new WhiteLabelFeatures();
  public company_id:string = '1';
  public companies:any[] = [];
  private prefrences: any;
  public auth:any[] = [];
  public allPrefences: PrefrencesService = new PrefrencesService();
  public userLocation: any = {};
  public lazyLoader: boolean = false;

  constructor(
    public router: Router,
    protected fAuth: AngularFireAuth
  ) {
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.userLocation["lat"] = pos.coords.latitude;
          this.userLocation["long"] = pos.coords.longitude;
          this.userLocation["accuracy"] = pos.coords.accuracy;
        },
        err => {
          this.userLocation["message"] = "permission not given";
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }
    let id = localStorage.getItem("selectedCompany");
    id = JSON.parse(id);

    if (id != null) {
      id = id["company_id"];
      this.setCompanyId(id);
    }

    if (router.url.slice(0, 9) != "/register") {
      this.setToken();
      this.getCompanies();
      // this.setPrefrences();
    }
  }

  setPrefrences() {
    AsyncApiCall.get('prefrences', {}).subscribe(resp=>{
      console.log("preference", resp);
      if(resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
        this.allPrefences.setPrefrences(resp.data[0]);
      }
    });
  }

  

  /**
   * @description get all companies of the user
   * @returns void
   */
  getCompanies(): void {
    console.log("getting uid");
    
    let uid:string = localStorage.getItem('uid');
    console.log("got uid", uid);
    
    if(uid != null || uid != undefined){
      AsyncApiCall.view('company', {uid: uid, FIELDS: ['company_id', 'company_name'], ORDER: {ORDER_BY: 'company_id'}, LIMIT: 50}).subscribe(resp => {
        if(resp.statusCode===StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
          this.companies = resp.data  
        }else {
          console.log("could not get companies");
          // this.router.navigate(['create-company']);
        }
      });
    }
  }

  /**
   * @description set token of the user
   */
  setToken():void {
    this.key = localStorage.getItem("invoice-tool-v2.0.1");    
    if (this.key === undefined || this.key === null) {
      console.log("no key found", this.key);
      console.log("signout from settoken in company service");
      
      this.fAuth.auth.signOut().then(() => {
        this.companies = [];
        this.router.navigate(['login']);
      }).catch(error => {
        console.log("can not signOut because ", error.code);      
      });    
    }
  }


  getPreference() {
    return [];
  }

  /**
   * @description set company to the localstrage
   * @param company current company that is being used
   * @param newc set preference for new company
   */
  setCompany(company) {
    console.log("company to set", company);
    localStorage.removeItem("logo");
    localStorage.removeItem("sign");
    console.log("sign here", company.company_sign, company.company_logo);
    if(company.company_sign && company.company_sign != ''){
      HelperFunction.base64(company.company_sign).then((resp:any)=>{
        localStorage.setItem('sign', resp);
      });
    }
    if(company.company_logo && company.company_logo != ''){
      HelperFunction.base64(company.company_logo).then((resp:any)=>{
        localStorage.setItem('logo', resp);
      });
    }    
    
    if (company.company_id) this.setCompanyId(company.company_id);
    localStorage.removeItem("selectedCompany");
    // if (!newc) this.setPrefrences();
    let uid = localStorage.getItem('uid');
    if(uid===null) console.log("uid is null no user loged in please logout");
    let response = SyncApiCall.post('token', {uid: uid, company_id: company.company_id});
    console.log("resp token", response);
    if(response.statusCode === StatusCodes.codes.CREATED){
      localStorage.setItem('invoice-tool-v2.0.1', response.data['token']);    
      localStorage.setItem("selectedCompany", JSON.stringify(company));
      this.companySource.next(company);
    }else {
      console.log("token not generated, re-login");      
    }
    
  }

  /**
   * @description get current company
   */
  getCompany():any {
    let selectedCompany = localStorage.getItem("selectedCompany");
    if (selectedCompany === null) {
      console.log("signout from getcompany from company service");
      
      this.router.navigate(["login"]);
      this.fAuth.auth.signOut().then(() => {
        this.companies = [];
        this.router.navigate(['login']);
      }).catch(error => {
        console.log("can not signOut because ", error.code);      
      });
      return {
        company_name: "",
        company_logo: ""
      };
    }
    return JSON.parse(selectedCompany);
  }

  setCompanyId(id:string):void {
    this.company_id = id;
  }
}
