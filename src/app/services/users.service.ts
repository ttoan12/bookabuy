import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, lastValueFrom } from 'rxjs';
import { User } from '../models/user.model';
import { toPlain } from '../utils';
import { omit } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly COLLECTION_PATH = 'users';
  private usersCollection$: AngularFirestoreCollection<User>;
  private users$: Observable<User[]>;

  constructor(afs: AngularFirestore) {
    this.usersCollection$ = afs.collection<User>(this.COLLECTION_PATH);
    this.users$ = this.usersCollection$.valueChanges();
  }

  get users() {
    return this.users$;
  }

  async create(user: User) {
    const users = await lastValueFrom(this.users);
    if (users.find((x) => x.email === user.email)) throw new Error('Email already exists!');

    await this.usersCollection$.doc(user.id).set(toPlain(user));

    const userSnapshot = this.usersCollection$
      .doc(user.id)
      .get()
      .pipe(map((x) => x.data()));

    return userSnapshot;
  }

  async update(id: string, user: Partial<User>) {
    const data = omit(user, 'id', 'email');

    await this.usersCollection$.doc(id).update(toPlain(data));

    const userSnapshot = this.usersCollection$
      .doc(user.id)
      .get()
      .pipe(map((x) => x.data()));

    return userSnapshot;
  }
}
