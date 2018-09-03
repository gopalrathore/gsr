import { PaymentVoucherFormatComponent } from './invoice-setting/numbering-format/payment-voucher-format/payment-voucher-format.component';
import { ReceiptVoucherFormatComponent } from './invoice-setting/numbering-format/receipt-voucher-format/receipt-voucher-format.component';
import { SalesInvoiceFormatComponent } from './invoice-setting/numbering-format/sales-invoice-format/sales-invoice-format.component';
import { CustomFieldsComponent } from './invoice-setting/custom-fields/custom-fields.component';
import { SignComponent } from './invoice-setting/sign/sign.component';
import { LogoComponent } from './invoice-setting/logo/logo.component';
import { DeclarationComponent } from './invoice-setting/declaration/declaration.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { InvoiceSettingRoutes } from './invoice-setting.routing';
import { InvoiceSettingComponent } from './invoice-setting/invoice-setting.component';
import { TncComponent } from './invoice-setting/tnc/tnc.component';
import { TemplateModule } from '../template/template.module';
import { AccordionModule, SliderModule, ColorPickerModule, SelectButtonModule, DropdownModule } from 'primeng/primeng';
import { TemplateComponent } from '../template/template.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InvoiceSettingRoutes),
    FormsModule,
    AccordionModule,
    SliderModule,
    ColorPickerModule,
    SelectButtonModule,
    DropdownModule
  ],
  declarations: [
    InvoiceSettingComponent,
    TncComponent,
    DeclarationComponent,
    LogoComponent,
    SignComponent,
    CustomFieldsComponent,
    SalesInvoiceFormatComponent,
    ReceiptVoucherFormatComponent,
    PaymentVoucherFormatComponent,
    TemplateComponent
  ]
})
export class InvoiceSettingModule { }
