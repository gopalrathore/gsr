import { IAppState, History } from './../redux/store';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { CHANGE_BULB_LOCATION } from '../redux/actions';

@Component({
  selector: 'app-bulb-svg',
  templateUrl: './bulb-svg.component.html',
  styleUrls: ['./bulb-svg.component.css']
})
export class BulbSvgComponent implements OnInit {

  history:History[];
  count:number;

  constructor(private ngRedux:NgRedux<IAppState>) {
    
    ngRedux.select<number>('count')
    .subscribe(newCount => this.count = newCount);

    ngRedux.select<History[]>('history')
      .subscribe(newHistory => {
        this.history = newHistory;
      });
   }

  ngOnInit() { }

  onMoveEnd(event) { 
    let bulbLocation = { x: event.x, y: event.y };
    this.ngRedux.dispatch({ type: CHANGE_BULB_LOCATION, bulbLocation: bulbLocation});
  }

}
