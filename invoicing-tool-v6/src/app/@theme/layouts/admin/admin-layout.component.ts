import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener
} from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  RoutesRecognized
} from "@angular/router";
import { Subscription } from "rxjs";
import { LocationStrategy, PlatformLocation, Location } from "@angular/common";
import { filter } from "rxjs/operators";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CompanyServiceService } from "../../../@core/services/company-service.service";

declare var $: any;

@Component({
  selector: "app-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.css"]
})
export class AdminLayoutComponent implements OnInit {
  location: Location;
  private _router: Subscription;
  // url: string;

  @ViewChild("sidebar") sidebar;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  constructor(
    private router: Router,
    location: Location,
    public companyServiceService: CompanyServiceService
  ) {
    this.location = location;
    router.events.subscribe(event => {
      // console.log(event);
      if (event instanceof NavigationStart)
        this.companyServiceService.lazyLoader = true;
      else if (event instanceof NavigationEnd) {
        $(".main-panel").animate({ scrollTop: 0 });
        // console.clear();
        this.companyServiceService.lazyLoader = false;

        // let fabricData = {
        //   url: event.urlAfterRedirects,
        //   deviceInfo: navigator.userAgent,
        //   deviceWidth: window.innerWidth,
        //   deviceHeight: window.innerHeight,
        //   userLocation: this.companyServiceService.userLocation
        // };
        // this.companyServiceService.sendToAPI(fabricData,'fabric').subscribe((resp)=>{

        // });
        
      } else if (event instanceof NavigationCancel)
        this.companyServiceService.lazyLoader = false;
    });
  }

  ngOnInit() {
    this._router = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        //   this.url = event.url;
        // console.log(event);

        this.navbar.sidebarClose();
      });

    var isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;
    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      var $main_panel = $(".main-panel");
      $main_panel.perfectScrollbar();
    }
  }

  public isMap() {
    if (
      this.location.prepareExternalUrl(this.location.path()) ==
      "/maps/fullscreen"
    ) {
      return true;
    } else {
      return false;
    }
  }
}
