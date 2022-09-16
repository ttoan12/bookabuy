import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { keyBy, sumBy } from 'lodash';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

interface CheckoutItem {
  bookId: string;
  name: string;
  author: string;
  unit: number;
  unitPrice: number;
  price: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  user: User;
  cart: CartItem[] = [];
  cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject(new Array<CartItem>());
  items: CheckoutItem[] = [];
  sum = 0;

  checkoutForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
    ]),
    address: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private bookService: BooksService,
    private orderService: OrdersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    if (cartService.getCartCount() < 1) router.navigate(['']);
  }

  ngOnInit() {
    this.fillUserAndCheckoutForm();
    this.fillCartList();
  }

  async fillUserAndCheckoutForm() {
    this.authService.user
      .pipe(
        take(1),
        tap((user) => {
          this.user = user!;

          this.checkoutForm = this.formBuilder.group({
            name: new FormControl(user?.name || '', [Validators.required]),
            email: new FormControl(user?.email || '', [Validators.required, Validators.email]),
            phone: new FormControl(user?.phone || '', [
              Validators.required,
              Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
            ]),
            address: new FormControl(user?.address || '', [Validators.required]),
          });
        })
      )
      .subscribe();
  }

  async fillCartList() {
    this.cart$.next(this.cartService.cart);

    this.cart$.pipe(switchMap(() => this.bookService.books)).subscribe((books) => {
      const booksById = keyBy(books, (book) => book.id);
      const newItems: CheckoutItem[] = [];

      this.cart$.getValue().forEach((item) => {
        const book = booksById[item.bookId];
        if (!book) return;

        const newItem: CheckoutItem = {
          bookId: book.id,
          name: book.name,
          author: book.author,
          unit: item.unit,
          unitPrice: book.salePrice || book.price,
          price: (book.salePrice || book.price) * item.unit,
        };
        newItems.push(newItem);
      });

      this.items = newItems;
      this.sum = sumBy(this.items, 'price');
    });
  }

  async checkout() {
    const order = new Order();

    order.userId = this.user.id;
    order.totalPrice = this.sum;
    order.createdAt = new Date();
    order.user = {
      name: this.checkoutForm.value.name!,
      phone: this.checkoutForm.value.phone!,
      address: this.checkoutForm.value.address!,
      email: this.checkoutForm.value.email!,
    };
    order.products = this.items.map((item) => ({
      bookId: item.bookId,
      name: item.name,
      author: item.author,
      unit: item.unit,
      price: item.price,
      unitPrice: item.unitPrice,
    }));

    const result = await this.orderService.create(order);
    if (result) {
      alert('Thanh toán thành công! Bạn có thể xem lại đơn hàng đã đặt ở Trang Cá Nhân.');
      this.cartService.clearCart();
      this.router.navigate(['']);
    } else {
      alert('Thanh toán thất bại, vui lòng thử lại.');
    }
  }
}
