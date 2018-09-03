// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyDKweRfOuGIBEsp1UjTXFVcLMQAtQ83fs0",
    authDomain: "ewaybill-a97ed.firebaseapp.com",
    databaseURL: "https://ewaybill-a97ed.firebaseio.com",
    projectId: "ewaybill-a97ed",
    storageBucket: "ewaybill-a97ed.appspot.com",
    messagingSenderId: "208973412743"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
