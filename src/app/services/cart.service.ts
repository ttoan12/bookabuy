import { Injectable } from '@angular/core';
import { sum } from 'lodash';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  get cart() {
    const storedCart = localStorage.getItem('cart');
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
    return cart;
  }

  getCartCount() {
    return sum(this.cart.map((item) => item.unit));
  }

  addToCart(id: string) {
    const cart = this.cart;

    const existItem = cart.findIndex((item) => item.bookId === id);
    if (existItem > -1) cart[existItem].unit += 1;
    else cart.push({ bookId: id, unit: 1 });

    localStorage.setItem('cart', JSON.stringify(cart));
    return true;
  }

  updateUnit(id: string, unit: number) {
    const cart = this.cart;

    const existItem = cart.findIndex((item) => item.bookId === id);
    if (existItem < 0) return null;

    cart[existItem].unit = unit;

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart[existItem].unit;
  }

  removeFromCart(id: string) {
    const cart = this.cart;

    const existItem = cart.findIndex((item) => item.bookId === id);
    if (existItem < 0) return null;

    const removed = cart.splice(existItem, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    return removed;
  }
}
