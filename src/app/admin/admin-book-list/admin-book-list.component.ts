import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css'],
})
export class AdminBookListComponent implements OnInit, OnDestroy {
  bookSubscriber: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  books: Book[] = [];

  constructor(private bookService: BooksService, private router: Router) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50],
      processing: true,
      deferRender: true,
      destroy: true,
      autoWidth: true,
      rowCallback: (row) => {
        const elm = $(row);
        elm.off('click');
        elm.on('click', () => {
          const id = elm.attr('data-id');
          if (id) this.goToDetail(id);
        });
        return row;
      },
    };

    this.bookSubscriber = this.bookService.books.subscribe((books) => {
      this.books = [...books];
      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy() {
    this.bookSubscriber.unsubscribe();
  }

  goToDetail(id: string) {
    this.router.navigate(['admin', 'books', id]);
  }
}
