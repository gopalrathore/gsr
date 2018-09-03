import { JUMP_TO } from './../redux/actions';
import { IAppState } from './../redux/store';
import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {

  @select() history:History[];
  @select() count:number;

  constructor(private ngRedux:NgRedux<IAppState>) { }

  ngOnInit() { }

  jumpTo(count:number):void{
    this.ngRedux.dispatch({type: JUMP_TO, count: count});   
  }
}
