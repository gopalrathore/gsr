export class FirebaseErrorHandler {
  constructor(){ }

  fireBaseErrorHandler (errorCode){
    if(errorCode === null || errorCode === undefined) console.warn("UNKNOWN ERROR");
    else if(errorCode === "auth/network-request-failed") console.warn("Please connect to internet.");
    else if(errorCode === "auth/email-already-in-use") console.warn('This email has already been taken.');
    else if(errorCode === "auth/user-not-found") console.log("User name and password did not match!");
    else if(errorCode === 'auth/wrong-password') console.warn('Error Password');
    else console.log("error.code",errorCode);
  }
}