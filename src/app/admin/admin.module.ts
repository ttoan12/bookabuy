import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminBookCreateComponent } from './admin-book-create/admin-book-create.component';
import { AdminBookEditComponent } from './admin-book-edit/admin-book-edit.component';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';
import { AdminOrderListComponent } from './admin-order-list/admin-order-list.component';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';

@NgModule({
  declarations: [
    AdminBookCreateComponent,
    AdminBookEditComponent,
    AdminBookListComponent,
    AdminOrderListComponent,
    AdminOrderDetailComponent,
    AdminLoginComponent,
    AdminRegisterComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
