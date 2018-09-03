import { FirebaseServiceService } from './firebase-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private firebaseServiceService: FirebaseServiceService) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let token = localStorage.getItem('invoice-tool-v2.0.1');
    if (token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
