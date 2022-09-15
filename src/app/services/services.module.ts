import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from './books.service';
import { OrdersService } from './orders.service';
import { UsersService } from './users.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularFirestoreModule],
  providers: [BooksService, OrdersService, UsersService, AuthService],
})
export class ServicesModule {}
