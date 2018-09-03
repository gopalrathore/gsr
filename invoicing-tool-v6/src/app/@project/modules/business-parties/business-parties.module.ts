import { FormsModule } from '@angular/forms';
import { BusinessPartiesRoutes } from './business-parties.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { VendorComponent } from './vendor/vendor.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { AddVendorComponent } from './vendor/add-vendor/add-vendor.component';
import {EditClientComponent} from "./client/add-client/edit-client.component";
import { EditVendorComponent } from './vendor/add-vendor/edit-vendor.component';
import {InputSwitchModule} from 'primeng/primeng';
import { ContactBookComponent } from './contact-book/contact-book.component';
import { AddContactComponent } from './contact-book/add-contact/add-contact.component';
import { AuthGuard } from '../../auth.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BusinessPartiesRoutes),
    FormsModule,
    InputSwitchModule
  ],
  declarations: [ClientComponent, AddClientComponent, VendorComponent, AddVendorComponent, EditClientComponent, EditVendorComponent, ContactBookComponent, AddContactComponent],
  providers: [AuthGuard]
})
export class BusinessPartiesModule { }
