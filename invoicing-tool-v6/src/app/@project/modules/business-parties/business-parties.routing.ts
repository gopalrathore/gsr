import { AddContactComponent } from './contact-book/add-contact/add-contact.component';
import { ContactBookComponent } from './contact-book/contact-book.component';
import { Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { VendorComponent } from './vendor/vendor.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { AddVendorComponent } from './vendor/add-vendor/add-vendor.component';
import {EditClientComponent} from "./client/add-client/edit-client.component";
import { EditVendorComponent } from './vendor/add-vendor/edit-vendor.component';
import { AuthGuard } from '../../auth.guard';

export const BusinessPartiesRoutes: Routes = [{
    path: '',
    children: [{
        path: 'clients',
        component: ClientComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clients/add-client',
        component: AddClientComponent,
        canActivate: [AuthGuard]
    },
    {
      path: 'clients/edit-client',
      component: EditClientComponent,
      canActivate: [AuthGuard]
    },
    {
        path: 'vendors',
        component: VendorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'vendors/add-vendor',
        component: AddVendorComponent,
        canActivate: [AuthGuard]
    },
    {
      path: 'vendors/edit-vendor',
      component: EditVendorComponent,
      canActivate: [AuthGuard]
    },
    {
        path: 'contact-book',
        component: ContactBookComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'contact-book/add',
        component: AddContactComponent,
        canActivate: [AuthGuard]
    },
    {
      path: 'contact-book/edit',
      component: EditVendorComponent,
      canActivate: [AuthGuard]
    }]
}];
