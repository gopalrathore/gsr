import { TOGGLE_BULB_STATE, TOGGLE_LOGO_STATE } from './../redux/actions';
import { IAppState } from './../redux/store';
import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulb-controller',
  templateUrl: './bulb-controller.component.html',
  styleUrls: ['./bulb-controller.component.css']
})
export class BulbControllerComponent implements OnInit {

  constructor(private ngRedux:NgRedux<IAppState>) { }

  ngOnInit() {
  }

  toggleLogoState():void{  
    this.ngRedux.dispatch({ type: TOGGLE_LOGO_STATE });
  }

  toggleBulbState():void{
    this.ngRedux.dispatch({ type: TOGGLE_BULB_STATE });
  }

}
