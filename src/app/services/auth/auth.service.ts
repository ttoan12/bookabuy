import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$: Observable<User | undefined>;
  private userId$ = new BehaviorSubject<string | null>(null);

  constructor(private afAuth: AngularFireAuth, private userService: UsersService) {
    this.user$ = this.userId$.pipe(switchMap((userId) => userService.getById(userId)));
    this.userId$.next(localStorage.getItem('userId'));
  }

  get user() {
    return this.user$;
  }

  async login(email: string, password: string) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (credential.user) {
        localStorage.setItem('userId', credential.user.uid);
        this.userId$.next(credential.user.uid);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('userId');
    this.userId$.next(null);
    return true;
  }

  async register(email: string, password: string, name: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (!credential.user) return false;

      const user: User = {
        id: credential.user.uid,
        email: email,
        name: name,
      };

      const created = await this.userService.create(user);
      if (created) {
        localStorage.setItem('userId', created.id);
        this.userId$.next(created.id);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async updateProfile(id: string, name: string, phone: string, address: string) {
    const user = new User();
    user.name = name;
    user.phone = phone;
    user.address = address;

    const result = await this.userService.update(id, user);
    if (result) this.userId$.next(result.id);
    return result;
  }
}
