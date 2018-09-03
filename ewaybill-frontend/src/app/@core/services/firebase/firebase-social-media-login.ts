import { Router } from '@angular/router';
import { FirebaseErrorHandler } from './firebase-error-handler';
import * as firebase from "firebase";
import { AsyncApiCall } from '../async-api-call';
import { Notification } from '../../utility-functions/utility-function';

export class FirebaseSocialMediaLogin {

  private firebaseAuthObject = firebase.auth();
  private firebaseGoogleAuth = new firebase.auth.GoogleAuthProvider();
  private firebaseFacebookAuth = new firebase.auth.FacebookAuthProvider();

  constructor(private errorHandler:FirebaseErrorHandler, private router:Router){
    this.firebaseFacebookAuth.addScope('user_birthday');
  }

  /**
   * @description Google login popup
   * @returns void
   */
  public googleLogin():void{
    this.firebaseAuthObject.signInWithPopup(this.firebaseGoogleAuth)
    .then(firebaseUser => {
      // this.postLoginRedirection();
    })
    .catch(error => {
      Notification.error(error.message, "top", "right");
      this.errorHandler.fireBaseErrorHandler(error.code);
    });
  }

  /**
   * @description Facebook login popup
   * @returns void
   */
  public facebookLogin():void{
    this.firebaseAuthObject.signInWithPopup(this.firebaseFacebookAuth)
    .then(firebaseUser => {
      // this.postLoginRedirection();
    })
    .catch(error => {
      Notification.error(error.message, "top", "right");
      this.errorHandler.fireBaseErrorHandler(error.code);
    });
  }

  /**
   * @description Redirect user to dashboard in succesfull login
   * @returns void
   */
  private postLoginRedirection():void{
    console.log("redirect now from firebase socila media login");
    let user:object = this.firebaseAuthObject.currentUser;
    AsyncApiCall.view('company', {uid: user['uid'], LIMIT: 1}).subscribe(resp => {
      console.log(resp);
      
      // if(resp.statusCode==200){
      //   this.router.navigate(['inner-dashboard']);
      // }else {
      //   console.log("going to create company");
        
      //   this.router.navigate(['create-company']);
      // }
    });
  }

}