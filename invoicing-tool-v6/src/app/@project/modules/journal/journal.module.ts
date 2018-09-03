import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JournalListComponent } from "./journal-list/journal-list.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { JournalRoutes } from "./journal.routing";
import { AutoCompleteModule } from "primeng/components/autocomplete/autocomplete";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { AddJournalComponent } from './add-journal/add-journal.component';
import { ViewJournalComponent } from './view-journal/view-journal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JournalRoutes),
    FormsModule,
    AutoCompleteModule,
    CalendarModule
  ],
  declarations: [JournalListComponent, AddJournalComponent, ViewJournalComponent]
})
export class JournalModule {}
