import { FirebaseServiceService } from './@core/services/firebase/firebase-service.service';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { map, mergeMap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private router:Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private metaService: Meta,
    private firebaseServiceService:FirebaseServiceService
  ){ }

  ngOnInit(){

    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .pipe(map(() => this.activatedRoute))
    .pipe(map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    }))
    .pipe(filter((route) => route.outlet === 'primary'))
    .pipe(mergeMap((route) => route.data))
    .subscribe((event) =>{
      // console.log("event",event);
      
      this.titleService.setTitle(event['title']);
      //Changing meta with name="description"
        var tag = { name: 'description', content: event['metaDescription'] };
        let attributeSelector : string = 'name="description"';
        this.metaService.removeTag(attributeSelector);
        this.metaService.addTag(tag, false);
  });
    
  }
}