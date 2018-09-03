import { Router } from '@angular/router';
import { CompanyServiceService } from '../company-service.service';
import { FirebaseSocialMediaLogin } from './firebase-social-media-login';
import { FirebaseNormalSignup } from './firebase-normal-signup';
import { FirebaseNormalLogin } from './firebase-normal-login';
import { FirebaseErrorHandler } from './firebase-error-handler';
import { Injectable } from '@angular/core';
import { PostLogin } from '../../utility-functions/utility-function';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseServiceService {

  private errorHandler;

  public normalLogin;

  public normalSignup;

  public socialMediaLogin;

  private postLogin;
  private user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(protected companyServiceService:CompanyServiceService, protected router:Router, protected fAuth: AngularFireAuth) {
    this.user = fAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log("user details uid",this.userDetails.uid);
          localStorage.removeItem('uid');
          localStorage.setItem('uid', this.userDetails.uid);
          console.log("uid set ho gayi h", this.userDetails.uid);          
          this.postLoginRedirection({...this.userDetails});
        }
        else {
          this.userDetails = null;
          localStorage.clear();
          console.log("user not logged in");
        }
      }
    );
    this.errorHandler = new FirebaseErrorHandler();
    this.normalLogin = new FirebaseNormalLogin(this.errorHandler, router, fAuth);
    
    this.socialMediaLogin = new FirebaseSocialMediaLogin(this.errorHandler, router, fAuth);
    this.postLogin = new PostLogin(companyServiceService, router, fAuth);
    this.normalSignup = new FirebaseNormalSignup(this.errorHandler, companyServiceService, router, fAuth);
  }

  isLoggedIn() {
    if (this.userDetails == null ) {
        return false;
      } else {
        return true;
      }
    }

    logout() {
      console.log("logout from logout in firebase service");
      
      this.fAuth.auth.signOut()
      .then((res) => this.router.navigate(['/login']));
    }

  /**
   * @description send password link to the given email
   * @param email email to send password link
   * @returns void
   */
  public sendPasswordResetLink(email:string){
    return this.fAuth.auth.sendPasswordResetEmail(email)
  }

  /**
   * @description Redirect user to dashboard in succesfull login
   * @returns void
   */
  public postLoginRedirection(user):void{
    this.postLogin.loggedIn(user);
  }
}
