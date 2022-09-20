import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AdminAuthService, private router: Router) {}

  canActivate() {
    return this.authService.user.pipe(map((user) => (user ? true : this.router.createUrlTree(['admin', 'login']))));
  }
}
