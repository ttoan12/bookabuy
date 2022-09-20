import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
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
  imports: [CommonModule, StoresRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
})
export class StoresModule {}
