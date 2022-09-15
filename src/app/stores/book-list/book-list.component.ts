import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  isLoading = true;
  books: Book[];

  constructor(private bookService: BooksService, private cartService: CartService) {}

  ngOnInit(): void {
    this.bookService.books.subscribe((books) => {
      this.books = books;
      this.isLoading = false;
    });
  }

  addToCart(bookId: string) {
    const result = this.cartService.addToCart(bookId);
    if (result) alert('Đã thêm vào giỏ hàng');
  }
}
