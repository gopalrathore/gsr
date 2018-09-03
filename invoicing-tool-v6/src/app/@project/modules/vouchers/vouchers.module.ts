import { FileUploadModule } from './../../../@theme/shared/file-upload/file-upload.module';
import { AddVendorModule } from './../../../@theme/shared/add-vendor/add-vendor.module';
import { AddClientModule } from './../../../@theme/shared/add-client/add-client.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VouchersRoutes } from './vouchers.routing'

import { RecieptVouchersComponent } from './reciept-vouchers/reciept-vouchers.component';
import { RecieptVoucherTransactionComponent } from './reciept-vouchers/reciept-voucher-transaction/reciept-voucher-transaction.component';
import { AddRecieptVoucherComponent } from './reciept-vouchers/add-reciept-voucher/add-reciept-voucher.component';
import {
    CalendarModule,
    AutoCompleteModule
  } from 'primeng/primeng';
import { PaymentVouchersComponent } from './payment-vouchers/payment-vouchers.component';
import { AddPaymentVoucherComponent } from './payment-vouchers/add-payment-voucher/add-payment-voucher.component';
import { PaymentVoucherTransactionComponent } from './payment-vouchers/payment-voucher-transaction/payment-voucher-transaction.component';
import { VoucherNumberSettingComponent } from './voucher-number-setting/voucher-number-setting.component';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(VouchersRoutes),
      FormsModule,
      CalendarModule,
      AutoCompleteModule,
      AddClientModule,
      AddVendorModule,
      FileUploadModule
  ],
  declarations: [
    RecieptVouchersComponent,
    RecieptVoucherTransactionComponent,
    AddRecieptVoucherComponent,
    PaymentVouchersComponent,
    AddPaymentVoucherComponent,
    PaymentVoucherTransactionComponent,
    VoucherNumberSettingComponent]
})
export class VouchersModule { }
