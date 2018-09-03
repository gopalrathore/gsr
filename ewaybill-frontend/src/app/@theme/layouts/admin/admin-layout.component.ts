import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Subscription } from "rxjs";
import { Location } from '@angular/common';
import { filter } from "rxjs/operators";
import { NavbarComponent } from '../../../@project/modules/shared/navbar/navbar.component';
import { CompanyServiceService } from '../../../@core/services/company-service.service';

declare var $: any;

@Component({
    selector: 'app-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.css']
})

export class AdminLayoutComponent implements OnInit {
    location: Location;
    private _router: Subscription;
    


    @ViewChild('sidebar') sidebar;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    constructor( private router: Router, location:Location,
      protected companyServiceService:CompanyServiceService,
     ) {
      this.location = location;

      router.events.subscribe( event => {
        if(event instanceof NavigationEnd){
            if(!(event.urlAfterRedirects==='/import' || event.urlAfterRedirects==='/import/upload-statistics')){
                localStorage.removeItem('session_id');
            }
        }
        });
      
    }


    ngAfterViewInit(){
      $('.main-panel').animate({scrollTop:0});
    }
    
    ngOnInit() {

      this._router = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        //   this.url = event.url;
        // console.log(event);

        this.navbar.sidebarClose();
      });

        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows){
        // if we are on windows OS we activate the perfectScrollbar function
            var $main_panel = $('.main-panel');
            $main_panel.perfectScrollbar();
        }
    }

    public isMap(){
        if(this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen'){
            return true;
        }
        else {
            return false;
        }
    }
}
