
import { Router } from '@angular/router';
import { CompanyServiceService } from '../company-service.service';
import { FirebaseSocialMediaLogin } from './firebase-social-media-login';
import { FirebaseNormalSignup } from './firebase-normal-signup';
import { FirebaseNormalLogin } from './firebase-normal-login';
import { FirebaseErrorHandler } from './firebase-error-handler';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Login } from '../../utility-functions/utility-function';

@Injectable()
export class FirebaseServiceService {
  private config:object = {
    apiKey: "AIzaSyDKweRfOuGIBEsp1UjTXFVcLMQAtQ83fs0",
    authDomain: "ewaybill-a97ed.firebaseapp.com",
    databaseURL: "https://ewaybill-a97ed.firebaseio.com",
    projectId: "ewaybill-a97ed",
    storageBucket: "ewaybill-a97ed.appspot.com",
    messagingSenderId: "208973412743"
  };

  private firebaseConfig;

  private errorHandler;

  public normalLogin;

  public normalSignup;

  public firebaseAuthObject;

  public socialMediaLogin;

  protected postLogin;

  constructor(protected companyServiceService:CompanyServiceService, protected router:Router) {
    console.log("firebase service initialized");  
    if (!firebase.apps.length) {
      console.log("initialize firebase here");
      firebase.initializeApp(this.config);
    }  
    this.firebaseAuthObject = firebase.auth();
    this.detectStateChange();
    this.errorHandler = new FirebaseErrorHandler();
    this.normalLogin = new FirebaseNormalLogin(this.errorHandler, router,companyServiceService);
    this.normalSignup = new FirebaseNormalSignup(this.errorHandler, router);
    this.socialMediaLogin = new FirebaseSocialMediaLogin(this.errorHandler, router);
    this.postLogin = new Login(companyServiceService, router, this.firebaseAuthObject);
  }

  /**
   * @description detect state change of auth
   * @returns void
   */
  private detectStateChange():void{
    let url:string = location.href.split('/').slice(-1).pop();    
    this.firebaseAuthObject.onAuthStateChanged(firebaseUser => {
      console.log("auth state changed");      
      if(firebaseUser){
        console.log("Logged in user: ", firebaseUser.email, firebaseUser.uid, this.router.url); 
        localStorage.removeItem('uid');
        localStorage.setItem('uid', firebaseUser.uid);        
        if(this.router.url==='/login') this.postLoginRedirection();            
      }else {
        console.log("no user logged in");
        localStorage.clear();
        if(this.router.url!="/register"){
          this.router.navigate(['login']);   
        }
      }
    })
  }

  /**
   * @description logout the user
   * @returns void
   */
  public firebaseLogout():void {
    this.firebaseAuthObject.signOut().then(() => {
      this.router.navigate(['login']);
    }).catch(error => {
      console.log("can not signOut because ", error.code);      
    });
  }

  /**
   * @description send password link to the given email
   * @param email email to send password link
   * @returns void
   */
  public sendPasswordResetLink(email:string){
    return this.firebaseAuthObject.sendPasswordResetEmail(email)
  }

  /**
   * @description Redirect user to dashboard in succesfull login
   * @returns void
   */
  public postLoginRedirection():void{
    console.log("redirect now called from firebase service");
    let user:any = this.firebaseAuthObject.currentUser;
    this.postLogin.login(user);
  }

  

  

  

  

  


  

  

}
