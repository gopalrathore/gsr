import { BulkJsonGeneratorComponent } from './bulk-json-generator/bulk-json-generator.component';
import { UploadStatComponent } from './upload-stat/upload-stat.component';
import { ImportHistoryComponent } from './import-history/import-history.component';
import { ImportComponent } from './import/import.component';

import { Routes } from '@angular/router';

export const importRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: ImportComponent
    }, {
        path: 'import-history',
        component: ImportHistoryComponent
    }, {
        path: 'upload-statistics',
        component: UploadStatComponent
    }, {
        path: 'all-e-way-bills',
        component: BulkJsonGeneratorComponent
    }]
}];
