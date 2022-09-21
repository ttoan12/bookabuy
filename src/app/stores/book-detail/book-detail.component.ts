import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  id: BehaviorSubject<string> = new BehaviorSubject('');
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
    this.activatedRoute.params.subscribe((params) => this.id.next(params['id']));
    this.id.pipe(switchMap((id) => this.bookService.getById(id))).subscribe((book) => {
      if (book) this.book = book;
      else this.router.navigate([]);
    });
    this.id.pipe(switchMap(() => this.bookService.books)).subscribe(
      (books) =>
        (this.books = books
          .filter((book) => book.id != this.id.value)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4))
    );
  }

  addToCart(id?: string, unit?: number) {
    id ?? (id = this.id.value);
    unit ?? (unit = this.unit);
    const result = this.cartService.addToCart(id, unit);
    if (result) {
      alert('Thêm vào giỏ hàng thành công');
    } else {
      alert('Thêm vào giỏ hàng không thành công, vui lòng thử lại');
    }
  }
}
