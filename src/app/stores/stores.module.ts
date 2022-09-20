import { CommonModule, registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
registerLocaleData(localeVi);

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { StoresRoutingModule } from './stores-routing.module';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    LayoutComponent,
    CartComponent,
    CheckoutComponent,
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'VND' },
    { provide: LOCALE_ID, useValue: 'vi' },
  ],
  imports: [CommonModule, StoresRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
})
export class StoresModule {}
