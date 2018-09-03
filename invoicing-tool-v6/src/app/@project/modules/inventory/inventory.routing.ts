import { Routes } from "@angular/router";
import { InventoryComponent } from "./inventory.component";
import { AddInventoryComponent } from "./add-inventory/add-inventory.component";

import { EditInventoryComponent } from "./add-inventory/edit-inventory.component";
import { AuthGuard } from "../../auth.guard";

export const InventoryRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: InventoryComponent,
        canActivate: [AuthGuard],
        data: {
          title: "List Inventory",
          metaDescription: "meta desc"
        }
      },
      {
        path: "add",
        component: AddInventoryComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Add Inventory",
          metaDescription: "meta desc"
        }
      },
      {
        path: "edit",
        component: EditInventoryComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Edit Inventory",
          metaDescription: "meta desc"
        }
      }
    ]
  }
];
