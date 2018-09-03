import { StatusCodes } from '../../dataset/dataset';
import { AsyncApiCall } from '../async-api-call';
import { Router } from '@angular/router';
import { FirebaseErrorHandler } from './firebase-error-handler';
import * as firebase from "firebase";
import { Notification } from '../../utility-functions/utility-function';
import { AngularFireAuth } from 'angularfire2/auth';

export class FirebaseNormalLogin {
  constructor(private errorHandler:FirebaseErrorHandler, private router:Router, protected fAuth: AngularFireAuth) {}

  /**
   * @description normal login with firebase with email and password
   * @param userEmail of the user
   * @param userPassword password of the user
   * @returns void
   */
  public firebaseLogin(userEmail:string, userPassword:string):void {

    console.log("Login Method Initiated", userEmail, userPassword);
    // Step 1: Try Login to firebase using email and password
    let loginPromise = this.fAuth.auth.signInWithEmailAndPassword(
      userEmail,
      userPassword
    );
    loginPromise
      .catch(error => {
        console.log("gopal", error.code);
        console.log("Firebase denied login due to unknow some reason.", error);
        this.errorHandler.fireBaseErrorHandler(error.code);
        //Step 2[error].1 : Check if user exists in firebase
        let signupMethodsListPromise = this.fAuth.auth.fetchSignInMethodsForEmail(
          userEmail
        );
        signupMethodsListPromise.then(signupMethodsList => {
          console.log("methods", signupMethodsList);
          
          if (error.code === "auth/user-not-found") {
            console.log("Reason 1 : Un-registered firebase user. Need to try migration.");
            // this.oldUserMigration(userEmail, userPassword);
            Notification.error('User Not Found.');
          } else if (signupMethodsList.indexOf("password") < 0) {
            console.log( "Reason 2 : Use your Firebase Social Media Login.", signupMethodsList);
            Notification.error('This login method is not authorised for you, use social media to login.');
          } else {            
            console.log("Reason 3 : Firebase denied access to this email.");
            Notification.error('Username and password did not match!');
            this.errorHandler.fireBaseErrorHandler(error.code);
          }
        }).catch(error => {
          this.errorHandler.fireBaseErrorHandler(error.code);
        });
      })
      .then(firebaseUser => {
        console.log("Direct Loigin from Firebase.", firebaseUser);
        // firebaseUser ? this.postLoginRedirection() : console.log("loginPromise is now resloved");
      });
  }

  /**
   * @description redirect user after firebase notmal login
   * @returns void
   */
  private postLoginRedirection():void{
    console.log("firebase normal login post login redirection");
    // let user:object = this.firebaseAuthObject.currentUser;
    // console.log("here gopal", user);
    
    // AsyncApiCall.view('company', {uid: user['uid'], LIMIT: 1}).subscribe(resp => {
    //   console.log("response from view company", resp);
      
    //   if(resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
    //     if(resp.data.length !== 0){
    //       // this.companyServiceService.setCompany(resp.data[0]); 
    //       console.log("going to dashboard"); 
    //       this.router.navigate(['inner-dashboard']);
    //     }else {
    //       console.log("going to create company");          
    //       this.router.navigate(['create-company']);
    //     }
    //   }else if(resp.statusCode  === StatusCodes.codes.NOT_FOUND){
    //     console.log("no company found");   
    //     this.router.navigate(['create-company']);   
    //   }else {
    //     console.log("view company did not work"); 
    //   }
      
    // });
  }

}
