import { CreateCompanyComponent } from './@project/modules/create-company/create-company.component';

import { StatePipe } from './@core/pipes/state.pipe';
import { FirebaseServiceService } from './@core/services/firebase/firebase-service.service';
import { TransfereService } from './@core/services/transfer.service';
import { AutoComplete } from './@core/services/Autocomplete';
import { CompanyServiceService } from './@core/services/company-service.service';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AdminLayoutComponent } from './@theme/layouts/admin/admin-layout.component';
import { EqualValidator } from './@project/modules/equal-validator.directive';
import { AuthLayoutComponent } from './@theme/layouts/auth/auth-layout.component';
import { HttpModule } from '@angular/http';
import { SidebarModule } from './@theme/sidebar/sidebar.module';
import { LazyLoaderModule } from './@theme/shared/lazy-loader/lazy-loader.module';
import { NavbarModule } from './@theme/shared/navbar/navbar.module';
import { FooterModule } from './@theme/shared/footer/footer.module';
import { FixedPluginModule } from './@theme/shared/fixedplugin/fixedplugin.module';
import { AuthGuard } from './@project/auth.guard';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuardService } from './@core/services/firebase/auth-guard.service';

export let InjectorInstance: Injector;

@NgModule({
    imports:      [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        SidebarModule,
        LazyLoaderModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        CreateCompanyComponent,
        EqualValidator,
        StatePipe,
    ],
    bootstrap:    [ AppComponent ],
    providers: [
      FirebaseServiceService,
      CompanyServiceService,
      AutoComplete,
      TransfereService,
      AuthGuard,
      AuthGuardService
    ],
})


export class AppModule {
    constructor(private injector: Injector) 
  {
    InjectorInstance = this.injector;
  }
}

