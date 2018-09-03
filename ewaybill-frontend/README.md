# Eway bill Frontend Project

This project is used to following tasks

1.  Add your company with GSTIN.
2.  Add muliple branches of your company.
3.  Generate JSON to upload on government portal by uploading an excel with data of the eway bill.

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
    "angularfire2": "^5.0.0-rc.11",
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
ng build
```

Production build:

```
ng build --prod
```

## Break down structure

Login System:
  Once the user is verified by the firebase then following events happen:
  1. setLoginToken: which sets the token in localstorage.
  2. getCompanyId: this function call getCompanyList() which return the id of the first company of the user.
    If company id is not found then createCompany() is called and createCompany() will create a new company and return its data.
  3. generateCompanyToken: this will generate the company token with the company id you get in step 2 and set it to localhost.
  4. getCompanyDetail: will get the detail of the company
  5. if the company name is not set redirect the user to `create-GSTIN` else set the company to localstorage and get all the gstid list and then navigate to `dashboard`


### Modules

Explain what these tests test and why

```
Give an example
```

## Built With

- [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Abhijit Srivastava** - _Project Bacjend API_
- **Gopal Singh Rathore** - _Frontend Angular Integration_

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
