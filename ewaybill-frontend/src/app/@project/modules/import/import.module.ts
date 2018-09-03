import { FormsModule } from '@angular/forms';
import { importRoutes } from './import.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportComponent } from './import/import.component';
import { RouterModule } from '@angular/router';
import { ImportHistoryComponent } from './import-history/import-history.component';
import { UploadStatComponent } from './upload-stat/upload-stat.component';
import {DataTableModule} from 'primeng/datatable';
import {CalendarModule} from 'primeng/calendar';
import { BulkJsonGeneratorComponent } from './bulk-json-generator/bulk-json-generator.component';
import {TableModule} from 'primeng/table';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(importRoutes),
    DataTableModule,
    CalendarModule,
    TableModule
  ],
  declarations: [ImportComponent, ImportHistoryComponent, BulkJsonGeneratorComponent, UploadStatComponent]
})
export class ImportModule { }