import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginGuard } from '../services/auth/admin-login.guard';
import { AdminGuard } from '../services/auth/admin.guard';
import { AdminBookCreateComponent } from './admin-book-create/admin-book-create.component';
import { AdminBookEditComponent } from './admin-book-edit/admin-book-edit.component';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import { AdminOrderListComponent } from './admin-order-list/admin-order-list.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminLayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminOrderListComponent, pathMatch: 'full' },
      { path: 'orders/:id', component: AdminOrderDetailComponent },
      { path: 'books', component: AdminBookListComponent },
      { path: 'books/create', component: AdminBookCreateComponent },
      { path: 'books/:id', component: AdminBookEditComponent },
      { path: 'profile', component: AdminProfileComponent },
    ],
  },

  {
    path: '',
    canActivate: [AdminLoginGuard],
    children: [
      { path: 'login', component: AdminLoginComponent, canActivate: [AdminLoginGuard] },
      { path: 'register', component: AdminRegisterComponent, canActivate: [AdminLoginGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
