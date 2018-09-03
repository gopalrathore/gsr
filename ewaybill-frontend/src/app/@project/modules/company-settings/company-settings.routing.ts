import { Routes } from '@angular/router';

import { CompanyProfileComponent } from './company-user-settings/company-user-settings.component';

export const CompanySettingsRoutes: Routes = [{
    path: '',
    redirectTo: 'profile'
}, {
    path: '',
    children: [{
        path: 'profile',
        component: CompanyProfileComponent
    }]
}];
