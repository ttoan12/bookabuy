import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { omit } from 'lodash';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { toPlain } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly COLLECTION_PATH = 'books';
  private booksCollection$: AngularFirestoreCollection<Book>;
  private books$: Observable<Book[]>;

  constructor(private afs: AngularFirestore) {
    this.booksCollection$ = afs.collection<Book>(this.COLLECTION_PATH);
    this.books$ = this.booksCollection$.valueChanges();
  }

  get books() {
    return this.books$;
  }

  getById(id: string | undefined | null) {
    return this.booksCollection$
      .doc(id ?? undefined)
      .get()
      .pipe(map((v) => v.data()));
  }

  async create(book: Book) {
    if (!book.id) book.id = this.afs.createId();
    await this.booksCollection$.doc(book.id).set(toPlain(book));

    const bookSnapshot = this.booksCollection$
      .doc(book.id)
      .get()
      .pipe(map((x) => x.data()));

    return firstValueFrom(bookSnapshot);
  }

  async update(id: string, book: Partial<Book>) {
    const data = omit(book, 'id');

    await this.booksCollection$.doc(id).update(toPlain(data));

    const bookSnapshot = this.booksCollection$
      .doc(id)
      .get()
      .pipe(map((x) => x.data()));

    return firstValueFrom(bookSnapshot);
  }
}
