import { Routes } from "@angular/router";

import { CompanyProfileComponent } from "./company-profile/company-profile.component";

export const CompanySettingsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: CompanyProfileComponent
      }
    ]
  }
];
