import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sum } from 'lodash';
import * as moment from 'moment';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css'],
})
export class AdminOrderListComponent implements OnInit {
  orders: (Order & { productName?: string })[] = [];
  earnLastWeek = 0;
  earnThisWeek = 0;
  ordersLastWeek = 0;
  ordersThisWeek = 0;

  constructor(private orderService: OrdersService, private router: Router) {}

  ngOnInit() {
    this.orderService.orders.subscribe((orders) => {
      this.orders = orders.map((order) => ({
        ...order,
        productName: order.products.map((product) => product.name).join(', '),
      }));
      const lastWeekStart = moment().subtract(14, 'day').startOf('day');
      const lastWeekEnd = moment().subtract(7, 'day').endOf('day');
      const thisWeekStart = moment().subtract(6, 'day').startOf('day');
      const thisWeekEnd = moment().endOf('day');

      const lastWeekOrders = this.orders.filter((order) =>
        moment(order.createdAt).isBetween(lastWeekStart, lastWeekEnd, 'day', '[]')
      );
      const thisWeekOrders = this.orders.filter((order) =>
        moment(order.createdAt).isBetween(thisWeekStart, thisWeekEnd, 'day', '[]')
      );

      this.earnLastWeek = sum(lastWeekOrders.map((order) => order.totalPrice));
      this.ordersLastWeek = lastWeekOrders.length;

      this.earnThisWeek = sum(thisWeekOrders.map((order) => order.totalPrice));
      this.ordersThisWeek = thisWeekOrders.length;
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['admin', 'orders', id]);
  }
}
