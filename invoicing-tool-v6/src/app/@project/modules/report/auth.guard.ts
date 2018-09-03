import { report, canRoute } from './data';
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationStart, NavigationCancel} from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyServiceService } from '../../../@core/services/company-service.service';
@Injectable()
export class AuthGuard implements CanActivate {
    reports = report;
    canRoute = canRoute;
  constructor(private router:Router,private companyServiceService:CompanyServiceService){
    router.events.forEach((event) => {
      if(event instanceof NavigationCancel) {
        if(router.routerState.snapshot.url==''){
          router.navigateByUrl('report/report');
        }
      }
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.canRoute[state.url] == undefined){
        return true;
      }
      return this.canRoute[state.url];
  }
}
