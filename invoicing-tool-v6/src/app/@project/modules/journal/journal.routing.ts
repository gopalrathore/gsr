import { ViewJournalComponent } from './view-journal/view-journal.component';
import { AddJournalComponent } from './add-journal/add-journal.component';
import { Routes } from "@angular/router";
import { JournalListComponent } from "./journal-list/journal-list.component";

export const JournalRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JournalListComponent,
        // canActivate: [AuthGuard],
        data: {
          title: "List Inventory",
          metaDescription: "meta desc"
        }
      },
      {
        path: "add",
        component: AddJournalComponent,
        // canActivate: [AuthGuard],
        data: {
          title: "Add Journal",
          metaDescription: "meta desc"
        }
      },
      {
        path: "view",
        component: ViewJournalComponent,
        // canActivate: [AuthGuard],
        data: {
          title: "view journal",
          metaDescription: "meta desc"
        }
      }
    ]
  }
];
