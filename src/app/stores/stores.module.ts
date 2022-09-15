import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

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
  imports: [CommonModule, StoresRoutingModule, FormsModule, ReactiveFormsModule],
})
export class StoresModule {}
