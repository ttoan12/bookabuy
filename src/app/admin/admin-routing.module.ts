import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBookCreateComponent } from './admin-book-create/admin-book-create.component';
import { AdminBookEditComponent } from './admin-book-edit/admin-book-edit.component';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import { AdminOrderListComponent } from './admin-order-list/admin-order-list.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';

const routes: Routes = [
  { path: '', component: AdminOrderListComponent, pathMatch: 'full' },
  { path: 'orders/:id', component: AdminOrderDetailComponent },
  { path: 'books', component: AdminBookListComponent },
  { path: 'books/create', component: AdminBookCreateComponent },
  { path: 'books/:id', component: AdminBookEditComponent },

  { path: 'login', component: AdminLoginComponent },
  { path: 'register', component: AdminRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
