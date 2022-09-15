import { Component, OnInit } from '@angular/core';
import { keyBy, sum, sumBy } from 'lodash';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';

interface BookItem {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: number;
  total: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject(new Array<CartItem>());
  books: BookItem[] = [];
  sum = 0;

  constructor(private cartService: CartService, private bookService: BooksService) {}

  ngOnInit() {
    this.cart$.next(this.cartService.cart);

    this.cart$.pipe(switchMap(() => this.bookService.books)).subscribe((books) => {
      const booksById = keyBy(books, (book) => book.id);
      const newItems: BookItem[] = [];

      this.cart$.getValue().forEach((item) => {
        const book = booksById[item.bookId];
        if (!book) return;

        const newItem: BookItem = {
          id: book.id,
          name: book.name,
          image: book.image,
          price: book.salePrice || book.price,
          unit: item.unit,
          total: (book.salePrice || book.price) * item.unit,
        };
        newItems.push(newItem);
      });

      this.books = newItems;
      this.sum = sumBy(this.books, 'total');
    });
  }

  updateUnit(id: string) {
    const index = this.books.findIndex((book) => book.id === id);
    if (!this.books[index].unit) this.books[index].unit = 1;

    const result = this.cartService.updateUnit(id, this.books[index].unit);
    if (result) this.cart$.next(this.cartService.cart);
  }

  removeFromCart(id: string) {
    const result = this.cartService.removeFromCart(id);
    if (result) this.cart$.next(this.cartService.cart);
  }
}
