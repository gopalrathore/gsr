import { ReportListingComponent } from "./report-listing/report-listing.component";
import { AuthGuard } from "../../auth.guard";
import { Routes } from "@angular/router";

export const ReportRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "business-ledger",
        loadChildren:
          "./business-ledger/business-ledger.module#BusinessLedgerModule"
      },
      {
        path: "business-report",
        loadChildren:
          "./business-report/business-report.module#BusinessReportModule"
      },
      {
        path: "tax-ledger",
        loadChildren: "./tax-ledger/tax-ledger.module#TaxLedgerModule"
      },
      {
        path: "tax-report",
        loadChildren: "./tax-report/tax-report.module#TaxReportModule"
      }
    ]
  },
  {
    path: "report",
    component: ReportListingComponent
  }
];
