import { GovLoginPageComponent } from './gov-login-page/gov-login-page.component';
import { EwaybillListComponent } from './ewaybill-list/ewaybill-list.component';
import { GenerateNewComponent } from './generate-new/generate-new.component';
import { Routes } from '@angular/router';

export const ewayBillRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: GovLoginPageComponent
    }, {
        path: 'generate-new-e-way-bill',
        component: GenerateNewComponent
    }, {
        path: 'e-way-bill-list',
        component: EwaybillListComponent
    }]
}];
