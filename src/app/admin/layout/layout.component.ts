import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AdminAuthService } from 'src/app/services/auth/admin-auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  user?: User;
  currentPath: string;

  constructor(private authService: AdminAuthService, private router: Router) {}

  async ngOnInit() {
    this.currentPath = this.router.url;
    this.router.events.subscribe((e: any) => e?.url && (this.currentPath = e.url));
    this.authService.user.subscribe((user) => (this.user = user));
  }

  async logOut() {
    const result = await this.authService.logout();
    if (result) this.router.navigate(['admin', 'login']);
  }
}
