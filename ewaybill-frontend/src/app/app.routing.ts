
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './@theme/layouts/admin/admin-layout.component';
import { EditGstinComponent } from './@project/modules/edit-gstin/edit-gstin.component';
import { AuthLayoutComponent } from './@theme/layouts/auth/auth-layout.component';
import { DashboardComponent } from './@project/modules/dashboard/dashboard.component';


export const AppRoutes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	}, {
		path: '',
		component: AdminLayoutComponent,
		children: [
			{
				path: 'dashboard',
				loadChildren: './@project/modules/inner-dashboard/inner-dashboard.module#InnerDashboardModule'
			}, {
				path: 'edit-gstin',
				component: EditGstinComponent
			}, {
				path: 'settings',
				loadChildren: './@project/modules/company-settings/company-settings.module#CompanySettingsModule'
			} , {
				path: 'import',
				loadChildren: './@project/modules/import/import.module#ImportModule'
			} , {
				path: 'ewaybill',
				loadChildren: './@project/modules/eway-bill/eway-bill.module#EwayBillModule'
			} , {
				path: 'support',
				loadChildren: './@project/modules/support/support.module#SupportModule'
			}
		]
	}, {
		path: '',
		component: AuthLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: './@theme/pages/pages.module#PagesModule'
			}
		]
	}, {
		path: 'create-GSTIN',
		component: DashboardComponent
	},
	{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];
