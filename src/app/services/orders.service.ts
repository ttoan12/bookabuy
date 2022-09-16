import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { omit } from 'lodash';
import { Observable, map, firstValueFrom } from 'rxjs';
import { Order } from '../models/order.model';
import { toPlain } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly COLLECTION_PATH = 'orders';
  private ordersCollection$: AngularFirestoreCollection<Order>;
  private orders$: Observable<Order[]>;

  constructor(private afs: AngularFirestore) {
    this.ordersCollection$ = afs.collection<Order>(this.COLLECTION_PATH);
    this.orders$ = this.ordersCollection$.valueChanges();
  }

  get orders() {
    return this.orders$;
  }

  getById(id: string | undefined | null) {
    return this.ordersCollection$
      .doc(id ?? undefined)
      .get()
      .pipe(map((v) => v.data()));
  }

  getOrdersByUser(userId: string) {
    return this.afs.collection<Order>(this.COLLECTION_PATH, (ref) => ref.where('userId', '==', userId)).valueChanges();
  }

  async create(order: Order) {
    if (!order.id) order.id = this.afs.createId();
    await this.ordersCollection$.doc(order.id).set(toPlain(order));

    const orderSnapshot = this.ordersCollection$
      .doc(order.id)
      .get()
      .pipe(map((x) => x.data()));

    return firstValueFrom(orderSnapshot);
  }

  async update(id: string, order: Partial<Order>) {
    const data = omit(order, 'id');

    await this.ordersCollection$.doc(id).update(toPlain(data));

    const orderSnapshot = this.ordersCollection$
      .doc(order.id)
      .get()
      .pipe(map((x) => x.data()));

    return firstValueFrom(orderSnapshot);
  }
}
