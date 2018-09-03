import { TemplateComponent } from './template.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';

export const TemplateRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: TemplateComponent,
        canActivate: [AuthGuard]
    }
  ]
}];
