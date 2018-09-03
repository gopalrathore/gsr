import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InventoryComponent } from "./inventory.component";
import { InventoryRoutes } from "./inventory.routing";
import { AddInventoryComponent } from "./add-inventory/add-inventory.component";
import { EditInventoryComponent } from "./add-inventory/edit-inventory.component";
import { AuthGuard } from "../../auth.guard";



@NgModule({
  imports: [CommonModule, RouterModule.forChild(InventoryRoutes), FormsModule],
  declarations: [
    InventoryComponent,
    AddInventoryComponent,
    EditInventoryComponent
  ],
  providers: [AuthGuard]
})
export class InventoryModule {}
