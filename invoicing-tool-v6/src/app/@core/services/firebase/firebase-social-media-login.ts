import { AsyncApiCall } from '../async-api-call';
import { Router } from '@angular/router';
import { Notification } from '../../utility-functions/utility-function';
import { CompanyServiceService } from '../company-service.service';
import { FirebaseErrorHandler } from './firebase-error-handler';
import * as firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';

export class FirebaseSocialMediaLogin {

  // private firebaseAuthObject = firebase.auth();
  // private firebaseGoogleAuth = new firebase.auth.GoogleAuthProvider();
  // private firebaseFacebookAuth = new firebase.auth.FacebookAuthProvider();

  constructor(private errorHandler:FirebaseErrorHandler, private router:Router, protected fAuth: AngularFireAuth){
    // this.firebaseFacebookAuth.addScope('user_birthday');
  }

  /**
   * @description Google login popup
   * @returns void
   */
  public signInWithGoogle() {
    this.fAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(user=>{
      console.log("firebase social media login google login");
    }).catch(error=>{
      Notification.error(error.message, "top", "right");
      this.errorHandler.fireBaseErrorHandler(error.code);
    });
  }

  /**
   * @description Facebook login popup
   * @returns void
   */
  // public facebookLogin():void{
  //   this.firebaseAuthObject.signInWithPopup(this.firebaseFacebookAuth)
  //   .then(firebaseUser => {
  //     // this.postLoginRedirection();
  //   })
  //   .catch(error => {
  //     Notification.error(error.message, "top", "right");
  //     this.errorHandler.fireBaseErrorHandler(error.code);
  //   });
  // }

  /**
   * @description Redirect user to dashboard in succesfull login
   * @returns void
   */
  // private postLoginRedirection():void{
  //   // console.log("redirect now");
  //   let user:object = this.firebaseAuthObject.currentUser;
  //   AsyncApiCall.view('company', {uid: user['uid'], LIMIT: 1}).subscribe(resp => {
  //     console.log(resp);
      
  //   });
  // }

}