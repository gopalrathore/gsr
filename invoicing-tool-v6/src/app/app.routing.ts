import { AuthGuardService } from './@core/services/firebase/auth-guard.service';
import { CreateCompanyComponent } from './@project/modules/create-company/create-company.component';

// import { ReportsComponent } from './reports/reports.component';
import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './@theme/layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './@theme/layouts/auth/auth-layout.component';

export const AppRoutes : Routes = [
		{
				path: '',
				redirectTo: 'inner-dashboard',
				pathMatch: 'full'
		}, {
				path: '',
				component: AdminLayoutComponent,
				children: [
						{
								path: 'invoice',
                loadChildren: './@project/modules/invoice/invoice.module#InvoiceModule',
                canActivate: [AuthGuardService]
						}, {
							path: 'business-parties',
              loadChildren: './@project/modules/business-parties/business-parties.module#BusinessPartiesModule',
              canActivate: [AuthGuardService]
						}, {
								path: 'inner-dashboard',
                loadChildren: './@project/modules/inner-dashboard/inner-dashboard.module#InnerDashboardModule',
                canActivate: [AuthGuardService]
						}, {
							path: 'support',
              loadChildren: './@project/modules/support/support.module#SupportModule',
              canActivate: [AuthGuardService]
						}, {
							path: 'payment',
              loadChildren: './@project/modules/tool-payment/tool-payment.module#ToolPaymentModule',
              canActivate: [AuthGuardService]
						},{
								path: 'vouchers',
                loadChildren: './@project/modules/vouchers/vouchers.module#VouchersModule',
                canActivate: [AuthGuardService]
						}, {
								path: 'settings',
                loadChildren: './@project/modules/invoice-setting/invoice-setting.module#InvoiceSettingModule',
                canActivate: [AuthGuardService]
						}, {
							path: 'profile',
              loadChildren: './@project/modules/company-settings/company-settings.module#CompanySettingsModule',
              canActivate: [AuthGuardService]
						},{
							path: 'expenses',
              loadChildren: './@project/modules/expenses/expenses.module#ExpensesModule',
              canActivate: [AuthGuardService]
						},{
							path: 'employee',
              loadChildren: './@project/modules/employee/employee.module#EmployeeModule',
              canActivate: [AuthGuardService]
						}, {
								path: 'inventory',
                loadChildren: './@project/modules/inventory/inventory.module#InventoryModule',
                canActivate: [AuthGuardService]
						}, {
							path: 'journal',
              loadChildren: './@project/modules/journal/journal.module#JournalModule',
              canActivate: [AuthGuardService]
						},{
								path: 'template-setting',
                loadChildren: './@project/modules/template/template.module#TemplateModule',
                canActivate: [AuthGuardService]
						},{
								path: 'bank',
                loadChildren: './@project/modules/bank/bank.module#BankModule',
                canActivate: [AuthGuardService]
						},{
							path: 'report',
              loadChildren: './@project/modules/report/report.module#ReportModule',
              canActivate: [AuthGuardService]
						}
        ]
		}, {
				path: '',
				component: AuthLayoutComponent,
				children: [
						{
								path: '',
                loadChildren: './@project/modules/pages/pages.module#PagesModule',
                // canActivate: [AuthGuardService]
						}
        ],
    }, 
    {
				path: 'create-company',
        component: CreateCompanyComponent,
        canActivate: [AuthGuardService]
		},
		{ path: '**', redirectTo: 'inner-dashboard', pathMatch: 'full'}
];
