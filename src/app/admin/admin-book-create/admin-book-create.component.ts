import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-admin-book-create',
  templateUrl: './admin-book-create.component.html',
  styleUrls: ['./admin-book-create.component.css'],
})
export class AdminBookCreateComponent implements OnInit {
  addBookForm: FormGroup;

  constructor(private bookService: BooksService, private fb: FormBuilder, private router: Router) {}

  async ngOnInit() {
    this.addBookForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      salePrice: new FormControl(''),
      description: new FormControl(''),
    });
  }

  async onSubmit() {
    this.addBookForm.disable();
    const { name, author, image, price, salePrice, description } = this.addBookForm.value;

    const book = new Book();
    book.name = name;
    book.author = author;
    book.image = image;
    book.price = price;
    book.salePrice = salePrice;
    book.description = description;

    const result = await this.bookService.create(book);

    if (result) {
      this.router.navigate(['admin/books']);
    } else {
      alert('Failed to add a new book');
      this.addBookForm.enable();
    }
  }
}
