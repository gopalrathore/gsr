import { AsyncApiCall } from '../../../@core/services/async-api-call';
import { FirebaseServiceService } from '../../../@core/services/firebase/firebase-service.service';
import { Observable } from "rxjs";
import { CompanyServiceService } from '../../../@core/services/company-service.service';
import {
  Component,
  OnInit,
  Renderer,
  ViewChild,
  ElementRef,
  Directive,
  Output,
  EventEmitter,
  HostListener,
  //state
} from "@angular/core";
import { ROUTES, CompanyRoutes } from "../../sidebar/sidebar.component";
import { Router, ActivatedRoute, RouterStateSnapshot } from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { WhiteLabelFeatures } from "../../../@core/dataset/dataset";

var misc: any = {
  navbar_menu_visible: 0,
  active_collapse: true,
  disabled_collapse_init: 0
};
declare var $: any;

@Component({
  // moduleId: module.id,
  selector: "navbar-cmp",
  templateUrl: "navbar.component.html"
})
export class NavbarComponent implements OnInit {
  // currentCompany = {
  //   company_name: "Company Name",
  //   company_logo: "http://placehold.it/300x300"
  // };
  currentCompany = this.companyServiceService.currentCompany.subscribe(
    currentCompany => (this.currentCompany = currentCompany)
  );
  private listTitles: any[];
  private companyRoutesTitle: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  private state: RouterStateSnapshot;
  public hotkeys: boolean = false;

  whiteLabelFeatures: WhiteLabelFeatures = new WhiteLabelFeatures();

  @ViewChild("navbar-cmp") button;

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (
      this.router.url == "/invoice/sales" &&
      this.hotkeys &&
      !$("textarea, input").is(":focus")
    ) {
      $(".modal").modal("hide");
      if (event.key == "1")
        this.router.navigate(["/invoice/sales/tax-invoice"]);
      if (event.key == "2")
        this.router.navigate(["/invoice/sales/retail-invoice"]);
      if (event.key == "3") this.router.navigate(["/invoice/sales"]);
    }

    if (
      this.router.url == "/invoice/purchase" &&
      this.hotkeys &&
      !$("textarea, input").is(":focus")
    ) {
      $(".modal").modal("hide");
      if (event.key == "1")
        this.router.navigate(["/invoice/purchase/purchase-invoice"]);
    }

    if (event.shiftKey && this.hotkeys && !$("textarea, input").is(":focus")) {
      $(".modal").modal("hide");
      if (event.key.toLowerCase() == "c")
        this.router.navigate(["/business-parties/clients/add-client"]);
      if (event.key.toLowerCase() == "v")
        this.router.navigate(["/business-parties/vendors/add-vendor"]);
      if (event.key.toLowerCase() == "i")
        this.router.navigate(["/inventory/add"]);
    }

    if (!event.shiftKey && this.hotkeys && !$("textarea, input").is(":focus")) {
      $(".modal").modal("hide");
      if (event.key.toLowerCase() == "d") {
        this.router.navigate(["/inner-dashboard"]);
      } else if (event.key.toLowerCase() == "c") {
        this.router.navigate(["/business-parties/clients"]);
      } else if (event.key.toLowerCase() == "v")
        this.router.navigate(["/business-parties/vendors"]);
      else if (event.key.toLowerCase() == "s")
        this.router.navigate(["/invoice/sales"]);
      else if (event.key.toLowerCase() == "p")
        this.router.navigate(["/invoice/purchase"]);
      else if (event.key.toLowerCase() == "*")
        this.router.navigate(["/settings"]);
      else if (event.key.toLowerCase() == "r")
        this.router.navigate(["/invoice/reports"]);
      else if (event.key.toLowerCase() == "i")
        this.router.navigate(["/inventory"]);
    }

    if (event.key == "`") {
      this.hotkeys = !this.hotkeys;
    }

    if (this.hotkeys) {
      this.hotKeyTimeCounter++;
      setTimeout(() => {
        if (--this.hotKeyTimeCounter == 0) this.hotkeys = false;
      }, 5000);
    }
  }

  private hotKeyTimeCounter: number = 0;


  constructor(
    location: Location,
    private renderer: Renderer,
    private element: ElementRef,
    private router: Router,
    public companyServiceService: CompanyServiceService,
    public firebaseServiceService:FirebaseServiceService
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {  
    this.currentCompany = this.companyServiceService.getCompany();
    // this.companyServiceService.currentCompany.subscribe(currentCompany=>this.currentCompany = currentCompany);
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.companyRoutesTitle = CompanyRoutes.filter(listTitle => listTitle);
    this.listTitles = this.listTitles.concat(this.companyRoutesTitle);

    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
    if ($("body").hasClass("sidebar-mini")) {
      misc.sidebar_mini_active = true;
    }
    $("#minimizeSidebar").click(function() {
      var $btn = $(this);

      if (misc.sidebar_mini_active == true) {
        $("body").removeClass("sidebar-mini");
        misc.sidebar_mini_active = false;
        $("#minimizeSidebar i").removeClass("ti-menu-alt");
        $("#minimizeSidebar i").addClass("ti-more-alt");
      } else {
        setTimeout(function() {
          $("body").addClass("sidebar-mini");
          $("#minimizeSidebar i").removeClass("ti-more-alt");
          $("#minimizeSidebar i").addClass("ti-menu-alt");

          misc.sidebar_mini_active = true;
        }, 300);
      }

      // we simulate the window Resize so the charts will get updated in realtime.
      var simulateWindowResize = setInterval(function() {
        window.dispatchEvent(new Event("resize"));
      }, 180);

      // we stop the simulation of Window Resize after the animations are completed
      setTimeout(function() {
        clearInterval(simulateWindowResize);
      }, 1000);
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

  sidebarOpen() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName("body")[0];
    setTimeout(function() {
      toggleButton.classList.add("toggled");
    }, 500);
    body.classList.add("nav-open");
    this.sidebarVisible = true;
  }
  sidebarClose() {
    var body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }
  sidebarToggle() {
    // var toggleButton = this.toggleButton;
    // var body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible == false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(2);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      var parent = this.listTitles[item];
      if (parent.path === titlee) {
        return parent.title;
      } else if (parent.children) {
        var children_from_url = titlee.split("/")[2];
        for (var current = 0; current < parent.children.length; current++) {
          if (parent.children[current].path === children_from_url) {
            return parent.children[current].title;
          }
        }
      }
    }
    return "Invoice";
  }

  getPath() {
    return this.location.prepareExternalUrl(this.location.path());
  }
  changePasswordSubmit(isValid, data) {
    if (isValid == true) {
    }
  }
}
