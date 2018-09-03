# Invoicing Tool Frontend Project

## Getting Started

This project is build using the angular cli and theme used is paperdashboard pro for angular by creative tim.

### Package Dependencies

Following are the dependencies for this project and are included in package.json

```
  "dependencies": {
    "@angular/animations": "^6.0.0",
    "@angular/common": "^6.0.0",
    "@angular/compiler": "^6.0.0",
    "@angular/core": "^6.0.0",
    "@angular/forms": "^6.0.0",
    "@angular/http": "^6.0.0",
    "@angular/platform-browser": "^6.0.0",
    "@angular/platform-browser-dynamic": "^6.0.0",
    "@angular/router": "^6.0.0",
    "bootstrap": "^3.3.7",
    "bootstrap-notify": "^3.1.3",
    "bootstrap-select": "^1.12.2",
    "bootstrap-switch": "^3.3.4",
    "bootstrap-tagsinput": "^0.7.1",
    "core-js": "^2.5.4",
    "crypto-js": "^3.1.9-1",
    "datatables": "^1.10.13",
    "datatables.net-bs": "^1.10.16",
    "datatables.net-responsive": "^2.2.1",
    "eonasdan-bootstrap-datetimepicker": "^4.17.47",
    "firebase": "^5.0.4",
    "jasny-bootstrap": "^3.1.3",
    "jquery": "^3.3.1",
    "ng2-charts": "^1.6.0",
    "nouislider": "^11.1.0",
    "pdfmake": "^0.1.37",
    "primeng": "^6.0.0-alpha.1",
    "rxjs": "^6.0.0",
    "twitter-bootstrap-wizard": "^1.2.0",
    "web-animations-js": "^2.3.1",
    "zone.js": "^0.8.26"
  },
  "devDependencies": {
    "@angular/compiler-cli": "^6.0.0",
    "@angular-devkit/build-angular": "~0.6.0",
    "typescript": "~2.7.2",
    "@angular/cli": "~6.0.0",
    "@angular/language-service": "^6.0.0",
    "@types/jasmine": "~2.8.6",
    "@types/jasminewd2": "~2.0.3",
    "@types/node": "~8.9.4",
    "codelyzer": "~4.2.1",
    "jasmine-core": "~2.99.1",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~1.7.1",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "~1.4.2",
    "karma-jasmine": "~1.1.1",
    "karma-jasmine-html-reporter": "^0.2.2",
    "protractor": "~5.3.0",
    "ts-node": "~5.0.1",
    "tslint": "~5.9.1"
  }
```

### Installing

Simple instalation should spin up the project in no time.

Run following command
1. 

```
npm install
```

2. 

```
ng serve
```

### Deployment

Simple:

```
ng build --base-href="/invoice-tool/"
```

Production build:

```
ng build --base-href="/invoice-tool/" --prod
```
base-href is the project path where you want to deploy eg: "/invoice-tool/".

## Break down structure

Login System:
After the user is verified by the firebase auth following events happen:
1. view company api call: this checks if the user has a already created company, if company not found the navigate to `create-company` else,
2. get the company details by calling get api on company
3. set the company to the localstorage and navigate to `inner-dashboard`

Folder Structure
1. @core:
  1.a. dataset:
    Contains all the data sets we need in the tool at different components in the tool. eg: states, countries, tax-rates.
    1.a.i. whitelable file controls the features and setting it to true or false will decide its rendering in the tool.
  1.b. pipes: 
    Contains all the pipes file used in the tool. eg: invoice-type, payment-due-date.
  1.c. services:
    1.c.i. firebase:
      Has the firebase integration file used to login and signup user.
    1.c.ii. async-api-calls:
      Controls the async api calls(post, delete, view, patch) happening in the tool. sets the header and token to the header.
    1.c.iii. Autocomplete:
      Handles the autocompete fields at different position in the tool. eg: client, vendor.
    1.c.iv. company-service:
      Handles the functions and data manipulations related the company selected. eg: sets the company, change the selected company.
    1.c.v. sync-api-call: 
      Handles the sync api call if you need one(same as async api call but synchronously).
    1.c.vi. transfer-service:
      Handle the data transfer between routes. eg: sets the data before routing, gets the data after the route.

  1.b. utility-function:
    1.b.i. encryption:
      Has functions to encrypt or decrypt the data going to localstorage.
    1.b.ii. helper-function:
      Should have all the functions which are not specific to perticular component but used throughout the tool. eg: getDate function(get date in required format).
    1.b.iii. local-storage:
      sets the localstorage data and gets the data when required.
    1.b.iv. notification: 
      used for showing the error, warning and success message in the tool.
    1.b.v. string-manipulation:
      has function like decodeHtlm and escapehtml to correctly set data to textarea tag.
    1.b.vi. validations:
      handles the validation of form fields in different form by giving a class "validateForm" to the form tag and giving the form object to the validations function.

2. @project:
  contains modules folder which has all the modules of the project.
  2.a. bank:
    handles the bank and cash section of the tool.
      2.a.i. add-bank:
        Form component to add more bank.
  2.b. business-paties:
    2.b.i. client:
      Handles the client component and used to add, edit and list the client.
    2.b.ii. contact-book:
      handles the contact of the clients and vendor.
    2.b.iii. vendor:
      Handles the vendor component and used to add, edit and list the vendor.
  2.c. company-setting:
    handles the company profile setting like updating the company details.
  2.d. create-company:
    Handle the creation of new company form.
  2.e. employee:
    Handles the employee component and used to add, edit and list the employee.
  2.f. expense:
    Handles the expense component and used to add, edit and list the expense.
  2.g. inner-dashboard:
    handles and display the data to the dashboard the user visits.
  2.h. inventory:
    Handles the inventory component and used to add, edit and list the inventory.
  2.i. invoice:
    Handle all the types of invoice like sales and purchase
    2.i.i. sales:
      use to create sales invoice like tax invoice, retail invoice.
    2.i.ii. @helperCalculator:
      use to calculate the invoice total.
    2.i.iii. @helperResouceDrivers:
      use to control the client, inventory and invoice number.
    2.i.iv. @interface: 
      has the interface for all the data valiable used in th sales invoice.
    2.i.v. quick-add:
      has the component for quick add client and invenory.
    2.i.vi Purchase:
      does the same as sales invoice but for purchase invoice.
  2.j. invoice-setting:
    handle the different part of invoice pdf setting.
  2.j.i. custom-fields:
    sets the custom fields for all the invoices.
  2.j.ii. declaration:
    sets the declaration for all the invoices.
  2.j.iii. logo:
    sets the logo in the invoice.
  2.j.iv. numbering-format:
    sets the numbering format for all the invoice.
  2.j.v. sign:
    sets the sign displayed on the invoice.
  2.j.vi. tnc:
    sets the tnc of all the invoice.



### Modules

Explain what these tests test and why

```
Give an example
```

## Authors

- **Gopal Singh Rathore** - _Frontend Angular Integration_
- **Abhijit Srivastava** - _Project Bacjend API_

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
