
import { FormsModule } from "@angular/forms";
import { TemplateRoutes } from "./template.routing";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { TemplateComponent } from "./template.component";
import {
  AccordionModule,
  SliderModule,
  ColorPickerModule,
  SelectButtonModule
} from "primeng/primeng";
import { AuthGuard } from "../../auth.guard";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TemplateRoutes),
    FormsModule,
    AccordionModule,
    SliderModule,
    ColorPickerModule,
    SelectButtonModule
  ],
  declarations: [
    // TemplateComponent
  ],
  providers: [AuthGuard]
})
export class TemplateModule {}
