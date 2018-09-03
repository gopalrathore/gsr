
import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';

import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { FirebaseServiceService } from '../../../../@core/services/firebase/firebase-service.service';
import { ROUTES, CompanyRoutes } from '../../../../@theme/sidebar/sidebar.component';

var misc:any ={
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
}
declare var $: any;

@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
})


export class NavbarComponent implements OnInit{

    private GSTINList:Array<object>;
    

    // currentCompany = this.companyServiceService.currentCompany.subscribe(currentCompany=>this.currentCompany = currentCompany);
    private listTitles: any[];
    private companyRoutesTitle:any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    private state: RouterStateSnapshot;
    
    
    @ViewChild("navbar-cmp") button;

    constructor(
        location:Location, 
        private renderer : Renderer, 
        private element : ElementRef, 
        private router:Router, 
        public companyServiceService:CompanyServiceService,
        private firebaseServiceService:FirebaseServiceService
    ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        this.companyRoutesTitle = CompanyRoutes.filter(listTitle => listTitle);
        this.listTitles = this.listTitles.concat(this.companyRoutesTitle);
           


        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        if($('body').hasClass('sidebar-mini')){
            misc.sidebar_mini_active = true;
        }
        
        $('#minimizeSidebar').click(function(){
            
            var $btn = $(this);

            if(misc.sidebar_mini_active === true){
                $('body').removeClass('sidebar-mini');
                misc.sidebar_mini_active = false;
                $('#minimizeSidebar i').removeClass('ti-menu-alt');
                $('#minimizeSidebar i').addClass('ti-more-alt');
            }else{
                setTimeout(function(){
                    $('body').addClass('sidebar-mini');
                    $('#minimizeSidebar i').removeClass('ti-more-alt');
                    $('#minimizeSidebar i').addClass('ti-menu-alt');
                    
                    misc.sidebar_mini_active = true;
                },300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            var simulateWindowResize = setInterval(function(){
                window.dispatchEvent(new Event('resize'));
            },180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function(){
                clearInterval(simulateWindowResize);
            },1000);
        });
    }

    


    sidebarOpen(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        },500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
    }
    sidebarClose(){
        var body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }
    sidebarToggle(){
        // var toggleButton = this.toggleButton;
        // var body = document.getElementsByTagName('body')[0];
        if(this.sidebarVisible === false){
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    getTitle(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 2 );
        }
        
        for(var item = 0; item < this.listTitles.length; item++){
            var parent = this.listTitles[item];
            if(parent.path === titlee){
                return parent.title;
            }else if(parent.children){
                var children_from_url = titlee.split("/")[2];
                for(var current = 0; current < parent.children.length; current++){
                    if(parent.children[current].path === children_from_url ){
                        return parent.children[current].title;
                    }
                }
            }
        }
        return 'Invoice';
    }

    ngAfterViewInit(){ 
    }

    getPath(){
        return this.location.prepareExternalUrl(this.location.path());
    }
    changePasswordSubmit(isValid,data){
        if(isValid===true){
            
        }
    }

    logout() {
        this.firebaseServiceService.firebaseLogout();
      }
    
}
