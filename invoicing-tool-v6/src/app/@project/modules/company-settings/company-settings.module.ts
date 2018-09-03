import { CompanyProfileComponent } from "./company-profile/company-profile.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CompanySettingsRoutes } from "./company-settings.routing";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CompanySettingsRoutes),
    FormsModule,
  ],
  declarations: [CompanyProfileComponent]
})
export class CompanySettingsModule {}
