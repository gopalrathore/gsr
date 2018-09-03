import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent }   from './app.component';
import { AppRoutes } from './app.routing';

import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from './@theme/sidebar/sidebar.module';
import { NavbarModule } from './@project/modules/shared/navbar/navbar.module';
import { FooterModule } from './@project/modules/shared/footer/footer.module';
import { FixedPluginModule } from './@project/modules/shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './@theme/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './@theme/layouts/auth/auth-layout.component';
import { DashboardComponent } from './@project/modules/dashboard/dashboard.component';
import { EqualValidator } from './@project/modules/equal-validator.directive';
import { EditGstinComponent } from './@project/modules/edit-gstin/edit-gstin.component';
import { BranchComponent } from './@project/modules/edit-gstin/branch/branch.component';
import { UnitPipe } from './@core/pipes/unit.pipe';
import { TransportationModePipe } from './@core/pipes/transportation-mode.pipe';
import { SubSupplyTypePipe } from './@core/pipes/sub-supply-type.pipe';
import { StatePipe } from './@core/pipes/state.pipe';
import { DocumentTypePipe } from './@core/pipes/document-type.pipe';
import { SupplyTypePipe } from './@core/pipes/supply-type.pipe';
import { EscapecharactersPipe } from './@core/pipes/escapecharacters.pipe';
import { FilterPipe } from './@core/pipes/filter.pipe';
import { CompanyServiceService } from './@core/services/company-service.service';
import { AutoComplete } from './@core/services/Autocomplete';
import { TransfereService } from './@core/services/transfer.service';
import { BillGenerationService } from './@core/services/bill-generation.service';
import { FirebaseServiceService } from './@core/services/firebase/firebase-service.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

@NgModule({
    imports:      [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        DashboardComponent,
        EqualValidator,
        EditGstinComponent,
        BranchComponent,
        UnitPipe,
        TransportationModePipe,
        SubSupplyTypePipe,
        StatePipe,
        DocumentTypePipe,
        SupplyTypePipe,
        EscapecharactersPipe,
        FilterPipe,
    ],
    bootstrap:    [ AppComponent ],
    providers: [
      CompanyServiceService,
      AutoComplete,
      TransfereService,
      BillGenerationService,
      FirebaseServiceService
    ],
})


export class AppModule { }
