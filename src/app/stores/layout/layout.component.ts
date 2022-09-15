import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  user?: User;
  cartCount = 0;

  constructor(private authService: AuthService, private cartService: CartService) {}

  async ngOnInit() {
    this.user = await firstValueFrom(this.authService.user);
    this.cartCount = this.cartService.getCartCount();
  }
}
