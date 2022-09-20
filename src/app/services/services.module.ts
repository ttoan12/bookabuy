import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AdminService } from './admin.service';
import { AdminAuthService } from './auth/admin-auth.service';
import { AuthService } from './auth/auth.service';
import { BooksService } from './books.service';
import { OrdersService } from './orders.service';
import { UsersService } from './users.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularFirestoreModule],
  providers: [BooksService, OrdersService, UsersService, AuthService, AdminAuthService, AdminService],
})
export class ServicesModule {}
