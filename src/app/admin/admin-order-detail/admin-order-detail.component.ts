import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css'],
})
export class AdminOrderDetailComponent implements OnInit {
  id: string;
  order: Order;

  constructor(private orderService: OrdersService, private activatedRoute: ActivatedRoute) {}

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.orderService.getById(this.id).subscribe((order) => (this.order = order!));
  }
}
