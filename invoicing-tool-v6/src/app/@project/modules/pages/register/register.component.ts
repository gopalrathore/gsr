import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { validations } from '../../../../@core/utility-functions/utility-function';
import { FirebaseServiceService } from '../../../../@core/services/firebase/firebase-service.service';

declare var $: any;

declare interface User {
    password:string;
    first_name:string;
    last_name:string;
    email:string;
    mobile:string;
}

@Component({
    // moduleId: module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

    public user: User = {
        password: '',
        first_name: "",
        last_name: "",
        email: "",
        mobile: ""
    };
    
    public password_confirmation:string = "";
    private refer: object = {};
    private test: Date = new Date();
    public passwordError:string = ""
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    protected validate = new validations(this.user);

    constructor(private element: ElementRef, public companyServiceService: CompanyServiceService, private router: Router, private activatedRoute: ActivatedRoute, 
        public firebaseServiceService:FirebaseServiceService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    private checkFullPageBackgroundImage():void {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.refer = JSON.parse(JSON.stringify(params));
        });
        this.checkFullPageBackgroundImage();

        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    ngAfterViewInit(){
        this.validate.validations();
    }

    public sidebarToggle():void {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    /**
     * @description return true if test case contain a number
     * @param param test case to be tested
     * @returns boolean
     */
    private containsnumber(param:any):boolean {
        for (let i = 0; i < param.length; i++)    if (!isNaN(param[i])) return true;
        return false;
    }

    /**
     * @description return true if test case contain a special character
     * @param param test case to be tested
     * @returns boolean
     */
    private containsSpecialChar(param:any):boolean {
        let list:string = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
        for (let i = 0; i < param.length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (list[j] == param[i]) return true;
            }
        }
        return false;
    }

    /**
     * @description returns true if password is valid else false
     * @param password password to be validated
     * @returns boolean
     */
    public validatePassword(password: string): boolean {
        let status:boolean = false;
        this.passwordError = '';

        if (password.length < 8) {
            this.passwordError = "Password should be atlease 8 character";
            return status;
        }
        else if (password.toLowerCase() == password || password.toUpperCase() == password) {
            this.passwordError = "Should have atlease 1 Upper case and 1 Lower case character.";
            return status;
        }
        else if (!this.containsnumber(password)) {
            this.passwordError = "should have number";
            return status;
        }
        else if (!this.containsSpecialChar(password)) {
            this.passwordError = "should have Special Character";
            return status;
        }
        else {
            this.passwordError = "";
            return true;
        }
    }

    /**
     * @description register the user to the database
     * @param isValid true if register form is valid else false
     * @param data object contains the form fields
     */
    public userSubmit(isValid:boolean, data:object):void {
        if (isValid) {
            console.log(data);            
            this.firebaseServiceService.normalSignup.firebaseSignup(data['first_name'], data['last_name'], data['email'], data['mobile'], data['password']);
        }
    }
}
