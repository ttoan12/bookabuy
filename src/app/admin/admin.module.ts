import { CommonModule, registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
registerLocaleData(localeVi);

import { AdminBookCreateComponent } from './admin-book-create/admin-book-create.component';
import { AdminBookEditComponent } from './admin-book-edit/admin-book-edit.component';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import { AdminOrderListComponent } from './admin-order-list/admin-order-list.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AdminBookCreateComponent,
    AdminBookEditComponent,
    AdminBookListComponent,
    AdminOrderListComponent,
    AdminOrderDetailComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminLayoutComponent,
    AdminProfileComponent,
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'VND' },
    { provide: LOCALE_ID, useValue: 'vi' },
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
})
export class AdminModule {}
