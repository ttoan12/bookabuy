import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { omit } from 'lodash';
import { firstValueFrom, map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { toPlain } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly COLLECTION_PATH = 'admin';
  private usersCollection$: AngularFirestoreCollection<User>;
  private users$: Observable<User[]>;

  constructor(afs: AngularFirestore) {
    this.usersCollection$ = afs.collection<User>(this.COLLECTION_PATH);
    this.users$ = this.usersCollection$.valueChanges();
  }

  get users() {
    return this.users$;
  }

  getById(id: string | undefined | null) {
    return this.usersCollection$
      .doc(id ?? undefined)
      .get()
      .pipe(map((v) => v.data()));
  }

  async create(user: User) {
    const users = await firstValueFrom(this.users);
    if (users.find((x) => x.email === user.email)) throw new Error('Email already exists!');

    await this.usersCollection$.doc(user.id).set(toPlain(user));

    const userSnapshot = this.usersCollection$
      .doc(user.id)
      .get()
      .pipe(map((x) => x.data()));

    return firstValueFrom(userSnapshot);
  }

  async update(id: string, user: Partial<User>) {
    const data = omit(user, 'id', 'email');

    await this.usersCollection$.doc(id).update(toPlain(data));

    const userSnapshot = this.usersCollection$
      .doc(id)
      .get()
      .pipe(map((x) => x.data()));

    return firstValueFrom(userSnapshot);
  }
}
