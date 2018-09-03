import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, Input } from '@angular/core';
import { CompanyServiceService } from '../../@core/services/company-service.service';

declare var $:any;
//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    moduleName:string;
    // icon: string;
    children?: ChildrenItems[];
    add?:string;
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
    add?:string;
}

export const CompanyRoutes = [
    {
        path: '/settings/profile',
        title: 'Company Profile',
        type: 'link',
        icontype: 'CP',
        companyModuleNAme:'profile'
    }
];

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/settings',
        title: 'Settings',
        type: 'link',
        icontype: 'ti-settings',
        moduleName:'setting'
    },
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'ti-dashboard',
        moduleName:'dashboard'

    }
];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {

    // currentCompany = this.companyServiceService.currentCompany.subscribe(currentCompany=>this.currentCompany = currentCompany);
    company:any = {
        company_name: ''
    };
    
    constructor(public companyServiceService:CompanyServiceService,private router:Router){
    }
    public menuItems: any[];
    public companyItems:any[];

    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.company = this.companyServiceService.getCompany();
        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.companyItems = CompanyRoutes.filter(companyItem => companyItem);
        isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows){
           // if we are on windows OS we activate the perfectScrollbar function
           $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
           $('html').addClass('perfect-scrollbar-on');
       } else {
           $('html').addClass('perfect-scrollbar-off');
       }
    }
    ngAfterViewInit(){
        var $sidebarParent = $('.sidebar .nav > li.active .collapse li.active > a').parent().parent().parent();

        var collapseId = $sidebarParent.siblings('a').attr("href");

        $(collapseId).collapse("show");
    }

    quickAdd(item){
        localStorage.setItem("quickAdd",item);
        this.router.navigate(['/settings']).then(
            () => {
              this.router.navigate(['/dashboard']);
            });
    }
}
