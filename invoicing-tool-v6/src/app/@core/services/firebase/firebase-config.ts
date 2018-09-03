import * as firebase from "firebase";

export class FirebaseErrorHandler {
  private config:object = {
    apiKey: "AIzaSyD5Clse9aBXwGpWPgXv2yKnDfe0DhTnq1o",
    authDomain: "invoicing-tool-login.firebaseapp.com",
    databaseURL: "https://invoicing-tool-login.firebaseio.com",
    projectId: "invoicing-tool-login",
    storageBucket: "invoicing-tool-login.appspot.com",
    messagingSenderId: "938883217226"
  };
  constructor(){
    firebase.initializeApp(this.config);
  }
  
}