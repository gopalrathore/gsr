import { AddGstinModule } from '../shared/add-gstin/add-gstin.module';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CompanySettingsRoutes } from './company-settings.routing';
import { CompanyProfileComponent } from './company-user-settings/company-user-settings.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CompanySettingsRoutes),
        FormsModule,
        AddGstinModule
    ],
    declarations: [CompanyProfileComponent, EditCompanyComponent]
})

export class CompanySettingsModule {}
