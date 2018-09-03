import { Router } from '@angular/router';
import { FirebaseErrorHandler } from './firebase-error-handler';
import * as firebase from "firebase";
import { Notification } from '../../utility-functions/utility-function';

export class FirebaseNormalSignup {

  firebaseAuthObject = firebase.auth();
  constructor(private errorHandler:FirebaseErrorHandler,
              private router:Router) { }

  /**
   * @description normail firebase signup with user details
   * @param userFirstName user first name
   * @param userLastName user last name
   * @param userEmail user email
   * @param userMobile user mobile number
   * @param userPassword user password
   * @returns void
   */
  public firebaseSignup(userFirstName:string, userLastName:string, userEmail:string, userMobile:string, userPassword:string):void{
    console.log("loging this guy", userEmail);
    
    // this.firebaseCallable = false;   
    console.log("Step 2 :", "Checking Firebase for "+userEmail+"'s existance");
  this.firebaseAuthObject.fetchSignInMethodsForEmail(userEmail)
  .then(signupMethodsList => {
      if(signupMethodsList.length !== 0){
        // this.firebaseCallable = true;
        Notification.error('Email address already Registered.', "top", "right");
        console.error("Abort", "Already Signed In (Firebase) Using", signupMethodsList);
        return false;
      }
      else{
        let that = this;
        this.firebaseAuthObject.createUserWithEmailAndPassword(userEmail, userPassword)
          .then(firebaseUser => {
            firebaseUser.user.updateProfile({displayName: userFirstName+' '+userLastName, photoURL:''})
            .then(function() {
              console.log("Step 4(a) :", "Firebase User name Updated to : "+ userFirstName+' '+userLastName+".");
              return firebaseUser.user.sendEmailVerification();
            })
            .then(function() {
              // that.firebaseCallable = true;
              Notification.success('Verification mail sent to your email ID.', "top", "right");
              console.log("Step 4(b) :", "Varification Email Sent.");
              that.postLoginRedirection();
            })
          })
          .catch(function(error) {
            // that.firebaseCallable = true;
            console.error("Abort", "Could not add to firebase.",error.code);
            Notification.error(error.message, "top", "right");
            that.errorHandler.fireBaseErrorHandler(error.code);
          });
      }
  })
  .catch(error =>{
    // this.firebaseCallable = true;
    this.errorHandler.fireBaseErrorHandler(error.code);
  });

  }

  /**
   * @description redirect user after user signup
   * @returns void
   */
  private postLoginRedirection():void{
    console.log("redirect now");
    this.router.navigate(['login']);
  }

  

}