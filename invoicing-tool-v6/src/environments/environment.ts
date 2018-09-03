// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD5Clse9aBXwGpWPgXv2yKnDfe0DhTnq1o",
    authDomain: "invoicing-tool-login.firebaseapp.com",
    databaseURL: "https://invoicing-tool-login.firebaseio.com",
    projectId: "invoicing-tool-login",
    storageBucket: "invoicing-tool-login.appspot.com",
    messagingSenderId: "938883217226"
  }
};

export const endPoints = {
  IFSC: 'https://ifsc.razorpay.com/'
}

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
