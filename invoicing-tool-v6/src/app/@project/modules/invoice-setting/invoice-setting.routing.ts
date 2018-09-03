import { Routes } from "@angular/router";
import { InvoiceSettingComponent } from "./invoice-setting/invoice-setting.component";

export const InvoiceSettingRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: InvoiceSettingComponent
      }
    ]
  }
];
