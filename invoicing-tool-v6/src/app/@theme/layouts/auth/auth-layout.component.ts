import { Router } from '@angular/router';
import { FirebaseServiceService } from './../../../@core/services/firebase/firebase-service.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
declare var $: any;

@Component({
    selector: 'app-layout',
    templateUrl: './auth-layout.component.html'
})

export class AuthLayoutComponent {
  constructor(protected fAuth: AngularFireAuth, private router:Router){
    fAuth.user.subscribe(user=>{
      if(user){
        //router.navigateByUrl('/inner-dashboard');
      }
    })
  }
}
