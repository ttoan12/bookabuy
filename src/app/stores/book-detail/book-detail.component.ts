import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  id: string;
  book: Book;
  books: Book[];
  unit = 1;

  constructor(
    private bookService: BooksService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.bookService.getById(this.id).subscribe((book) => {
      if (book) this.book = book;
      else this.router.navigate([]);
    });
    this.bookService.books.pipe(take(1)).subscribe((books) => {
      this.books = books.sort(() => 0.5 - Math.random()).slice(0, 4);
    });
  }

  addToCart(id?: string, unit?: number) {
    id ?? (id = this.id);
    unit ?? (unit = this.unit);
    const result = this.cartService.addToCart(id, unit);
    if (result) {
      alert('Thêm vào giỏ hàng thành công');
    } else {
      alert('Thêm vào giỏ hàng không thành công, vui lòng thử lại');
    }
  }
}
