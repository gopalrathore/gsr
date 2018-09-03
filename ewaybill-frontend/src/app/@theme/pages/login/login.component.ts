import { AsyncApiCall } from './../../../@core/services/async-api-call';
import { Notification } from '../../../@core/utility-functions/functions/notification';

import { NgForm } from '@angular/forms';
import { Component, OnInit, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyServiceService } from '../../../@core/services/company-service.service';
import { FirebaseServiceService } from '../../../@core/services/firebase/firebase-service.service';

declare var $: any;
declare interface ForgotPassword {
  email:string;
  validEmail: string
}

@Component({
  selector: "login-cmp",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {
  private refer: object;
  private toggleButton;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public passwordVisibility:boolean = false;

  public email:string = "gopal94@gmail.com";
  public password:string = "Gopal@123";

  public forgotPassword:ForgotPassword = {
    email: "",
    validEmail: ""
  };
  constructor(
    private element: ElementRef,
    public companyServiceService: CompanyServiceService,
    private router: Router,
    public firebaseServiceService:FirebaseServiceService,
  ) {
    // this.logging();
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  checkFullPageBackgroundImage() {
    var $page = $(".full-page");
    var image_src = $page.data("image");

    if (image_src !== undefined) {
      var image_container =
        '<div class="full-page-background" style="background-image: url(' +
        image_src +
        ') "/>';
      $page.append(image_container);
    }
  }

  ngOnInit() {
    $(document).ready(function() {
      $(".forget-pass").click(function() {
        $(".flip-form").css("transform", "rotateY(180deg)");
      });
      $(".back").click(function() {
        $(".flip-form").css("transform", "");
      });
    });
    this.checkFullPageBackgroundImage();

    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];

    setTimeout(function() {
      // after 1000 ms we add the class animated to the login/register card
      $(".card").removeClass("card-hidden");
    }, 700);
  }

  sidebarToggle() {
    let toggleButton = this.toggleButton;
    let body = document.getElementsByTagName("body")[0];
    var sidebar = document.getElementsByClassName("navbar-collapse")[0];
    if (this.sidebarVisible === false) {
      setTimeout(function() {
        toggleButton.classList.add("toggled");
      }, 500);
      body.classList.add("nav-open");
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove("toggled");
      this.sidebarVisible = false;
      body.classList.remove("nav-open");
    }
  }

  /**
   * @description login the user to the tool
   * @param isValid true if login form is valid else false
   * @param data object contains the form fields
   * @returns void
   */
  public userSubmit(isValid:boolean, data:object):void {
    if (isValid) {
      this.firebaseServiceService.normalLogin.firebaseLogin(data['email'],data['password']);
    } else {
      Notification.error('Please fill all required field.', "top", "right");
    }
  }

  /**
   * @description handle forget password form
   * @param form form object that contail forget password form fields
   * @returns void
   */
  public forgetPassword(form: NgForm):void {
    if(form.valid){
      this.firebaseServiceService.sendPasswordResetLink(form.value['email'])
      .then(function() {
        $('.back').click();
        form.reset();
        Notification.success('Reset link sent to your mail.', "top", "right");
      }).catch(function(error) {    
        Notification.error('Email ID not found.', "top", "right");
      });
    }else {
      Notification.error('Provide valid email', "top", "right");
    }
  }
}
