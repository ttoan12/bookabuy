import { Injectable } from '@angular/core';
import { sum } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject([] as CartItem[]);

  get cart() {
    const storedCart = localStorage.getItem('cart');
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
    this.cart$.next(cart);
    return cart;
  }

  get cartObservable() {
    return this.cart$.asObservable();
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
    this.cart$.next(cart);
    return true;
  }

  updateUnit(id: string, unit: number) {
    const cart = this.cart;

    const existItem = cart.findIndex((item) => item.bookId === id);
    if (existItem < 0) return null;

    cart[existItem].unit = unit;

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart$.next(cart);
    return cart[existItem].unit;
  }

  removeFromCart(id: string) {
    const cart = this.cart;

    const existItem = cart.findIndex((item) => item.bookId === id);
    if (existItem < 0) return null;

    const removed = cart.splice(existItem, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart$.next(cart);
    return removed;
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cart$.next([]);
    return true;
  }
}
