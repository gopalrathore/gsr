import { CompanyServiceService } from './../company-service.service';


import { Router } from '@angular/router';
import { FirebaseErrorHandler } from './firebase-error-handler';
import * as firebase from "firebase";
import { Notification, Login } from '../../utility-functions/utility-function';

export class FirebaseNormalLogin {

  protected postLogin;
  protected firebaseAuthObject = firebase.auth();
  constructor(
    private errorHandler: FirebaseErrorHandler,
    private router: Router,
    protected companyServiceService:CompanyServiceService,
  ) {
      this.postLogin = new Login(companyServiceService, router, this.firebaseAuthObject);
    }

  /**
   * @description normal login with firebase with email and password
   * @param userEmail of the user
   * @param userPassword password of the user
   * @returns void
   */
  public firebaseLogin(userEmail: string, userPassword: string): void {

    console.log("Login Method Initiated", userEmail, userPassword);
    // Step 1: Try Login to firebase using email and password
    let loginPromise = this.firebaseAuthObject.signInWithEmailAndPassword(
      userEmail,
      userPassword
    );
    loginPromise
      .catch(error => {
        console.log("Firebase denied login due to unknow some reason.", error);
        this.errorHandler.fireBaseErrorHandler(error.code);
        //Step 2[error].1 : Check if user exists in firebase
        let signupMethodsListPromise = this.firebaseAuthObject.fetchSignInMethodsForEmail(
          userEmail
        );
        signupMethodsListPromise.then(signupMethodsList => {
          console.log("methods", signupMethodsList);

          if (error.code === "auth/user-not-found") {
            console.log("Reason 1 : Un-registered firebase user. Need to try migration.");
            // this.oldUserMigration(userEmail, userPassword);
            Notification.error('User Not Found.', "bottom", "center");
          } else if (signupMethodsList.indexOf("password") < 0) {
            console.log("Reason 2 : Use your Firebase Social Media Login.", signupMethodsList);
            Notification.error('This login method is not authorised for you, use social media to login.', "bottom", "center");
          } else {
            console.log("Reason 3 : Firebase denied access to this email.");
            Notification.error('Username and password did not match!', "bottom", "center");
            this.errorHandler.fireBaseErrorHandler(error.code);
          }
        }).catch(error => {
          this.errorHandler.fireBaseErrorHandler(error.code);
        });
      })
      .then(firebaseUser => {
        console.log("Direct Loigin from Firebase.", firebaseUser);
        firebaseUser ? this.postLoginRedirection() : console.log("loginPromise is now resloved");
      });
  }

  /**
   * @description redirect user after firebase notmal login
   * @returns void
   */
  private postLoginRedirection(): void {
    console.log("redirect now called from firebase normal login");
    let user:any = this.firebaseAuthObject.currentUser;
    this.postLogin.login(user);
  }

}
