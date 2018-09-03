import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './redux/store';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { BulbControllerComponent } from './bulb-controller/bulb-controller.component';
import { UserActionComponent } from './user-action/user-action.component';
import { BulbSvgComponent } from './bulb-svg/bulb-svg.component';

@NgModule({
  declarations: [
    AppComponent,
    BulbControllerComponent,
    UserActionComponent,
    BulbSvgComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    AngularDraggableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>){    
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
