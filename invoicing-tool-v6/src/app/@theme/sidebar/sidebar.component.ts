import { FirebaseServiceService } from './../../@core/services/firebase/firebase-service.service';
import { Router } from "@angular/router";
import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  Input
} from "@angular/core";
import { CompanyServiceService } from "../../@core/services/company-service.service";
import { WhiteLabelFeatures } from "../../@core/dataset/dataset";
import { AsyncApiCall } from "../../@core/services/async-api-call";

declare var $: any;
//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  moduleName: string;
  // icon: string;
  children?: ChildrenItems[];
  add?: string;
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
  add?: string;
}

export const CompanyRoutes = [
  {
    path: "/profile",
    title: "Company Profile",
    type: "link",
    icontype: "CP",
    companyModuleNAme: "profile"
  },
  {
    path: "/report/report",
    title: "Reports",
    type: "link",
    icontype: "RP",
    companyModuleNAme: "reports"
  },
  // {
  //   path: "/template-setting",
  //   title: "Template Setting",
  //   type: "link",
  //   icontype: "TS",
  //   companyModuleNAme: "templateSetting"
  // },
  {
    path: "/employee",
    title: "Company Employee",
    type: "link",
    icontype: "EM",
    add: "/employee/add-employee",
    companyModuleNAme: "employee"
  },
  {
    path: "/bank",
    title: "Cash & Bank",
    type: "link",
    icontype: "B",
    companyModuleNAme: "bank",
    // add: "/bank/add-bank"
  }
];

//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/inner-dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "ti-dashboard",
    moduleName: "dashboard"
  },
  {
    path: "/invoice",
    title: "Invoice",
    type: "sub",
    icontype: "ti-receipt",
    moduleName: "invoice",
    children: [
      { path: "sales", title: "Sales Invoice", ab: "SI" },
      { path: "purchase", title: "Purchase Invoice", ab: "PI" }
    ]
  },
  {
    path: "/business-parties",
    title: "Bussiness-Parties",
    type: "sub",
    icontype: "ti-user",
    moduleName: "businessParties",
    children: [
      {
        path: "clients",
        title: "Clients",
        ab: "C",
        add: "/business-parties/clients/add-client"
      },
      {
        path: "vendors",
        title: "Vendors",
        ab: "V",
        add: "/business-parties/vendors/add-vendor"
      },
      // {path: 'contact-book', title: 'Contact Book', ab:'CB', add: '/business-parties/contact-book/add'}
    ]
  },
  {
    path: "/inventory",
    title: "Goods / Service",
    type: "link",
    icontype: "ti-shopping-cart",
    moduleName: "inventory",
    add: "/inventory/add"
  },
  {
    path: "/vouchers",
    title: "vouchers",
    type: "sub",
    icontype: "ti-clipboard",
    moduleName: "voucher",
    children: [
      {
        path: "receipt",
        title: "Receipt Vouchers",
        ab: "RV",
        add: "/vouchers/receipt/add"
      },
      {
        path: "payment",
        title: "Payment Vouchers",
        ab: "PV",
        add: "/vouchers/payment/add"
      }
    ]
  },
  {
    path: '/journal',
    title: 'Journals',
    type: 'link',
    icontype: 'ti-pie-chart',
    add: '/journal/add',
    moduleName: 'journals'
  }
];

@Component({
  // moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html"
})
export class SidebarComponent {
  // currentCompany: {
  //   company_name: "Company Name",
  //   company_logo: "http://placehold.it/300x300"
  // };
  currentCompany = this.companyServiceService.currentCompany.subscribe(
    currentCompany => (this.currentCompany = currentCompany)
  );
  company = {
    company_name: "Company Name",
    company_logo: "http://placehold.it/300x300"
  };
  constructor(
    public companyServiceService: CompanyServiceService,
    private router: Router,
    private firebaseServiceService:FirebaseServiceService
  ) {}
  public menuItems: any[];
  public companyItems: any[];

  whiteLabelFeatures: WhiteLabelFeatures = new WhiteLabelFeatures();

  isNotMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    // this.currentCompany = {
    //   company_name: "Company Name",
    //   company_logo: "http://placehold.it/300x300"
    // }
    // this.companyServiceService.currentCompany.subscribe(currentCompany=>this.currentCompany = currentCompany);
    this.currentCompany = this.companyServiceService.getCompany();
    this.company = this.companyServiceService.getCompany();    
    var isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.companyItems = CompanyRoutes.filter(companyItem => companyItem);

    isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;

    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      $(".sidebar .sidebar-wrapper, .main-panel").perfectScrollbar();
      $("html").addClass("perfect-scrollbar-on");
    } else {
      $("html").addClass("perfect-scrollbar-off");
    }
  }
  ngAfterViewInit() {
    var $sidebarParent = $(".sidebar .nav > li.active .collapse li.active > a")
      .parent()
      .parent()
      .parent();

    var collapseId = $sidebarParent.siblings("a").attr("href");    

    $(collapseId).collapse("show");

    $(".menu-item").click(function(){
      $(".menu-list .collapse").collapse('hide');      
    });

  }

  selectCompany(i) {
    this.companyServiceService.company_id = this.companyServiceService.companies[i].company_id;
    AsyncApiCall.get('company', {company_id: this.companyServiceService.companies[i].company_id}).subscribe(data => {
      if(data.statusCode == 203){
        this.companyServiceService.setCompany(data.data[0]);
        this.currentCompany = this.companyServiceService.getCompany();
        this.router.navigate(["/inventory"]).then(() => {
          this.router.navigate(["/inner-dashboard"]);
        });
      }      
    });
  }
}
