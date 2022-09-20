import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-admin-book-edit',
  templateUrl: './admin-book-edit.component.html',
  styleUrls: ['./admin-book-edit.component.css'],
})
export class AdminBookEditComponent implements OnInit {
  id: string;
  editBookForm: FormGroup;

  constructor(
    private bookService: BooksService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.editBookForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      salePrice: new FormControl(''),
      description: new FormControl(''),
    });

    this.bookService
      .getById(this.id)
      .pipe(take(1))
      .subscribe((book) => {
        this.editBookForm = this.fb.group({
          name: new FormControl(book?.name || '', [Validators.required]),
          author: new FormControl(book?.author || '', [Validators.required]),
          image: new FormControl(book?.image || '', [Validators.required]),
          price: new FormControl(book?.price || '', [Validators.required]),
          salePrice: new FormControl(book?.salePrice || ''),
          description: new FormControl(book?.description || ''),
        });
      });
  }

  async onSubmit() {
    this.editBookForm.disable();
    const { name, author, image, price, salePrice, description } = this.editBookForm.value;

    const book = new Book();
    book.name = name;
    book.author = author;
    book.image = image;
    book.price = price;
    book.salePrice = salePrice;
    book.description = description;

    const result = await this.bookService.update(this.id, book);

    if (result) {
      this.router.navigate(['admin/books']);
    } else {
      alert('Failed to update book');
      this.editBookForm.enable();
    }
  }
}
