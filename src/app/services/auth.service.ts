import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$: any;

  constructor(private afAuth: AngularFireAuth, private userService: UsersService) {
    afAuth.authState.subscribe((user) => {
      if (user) {
        this.user$ = user;
        localStorage.setItem('user', user.uid);
      } else {
        localStorage.setItem('user', '');
      }
    });
  }

  async login(email: string, password: string) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    const isAuthenticated = Boolean(credential.credential && credential.user);
    return isAuthenticated;
  }

  async register(email: string, password: string, name: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if (credential.user) {
      const user = new User();
      user.id = credential.user.uid;
      await this.userService.create(user);
    }
  }
}
