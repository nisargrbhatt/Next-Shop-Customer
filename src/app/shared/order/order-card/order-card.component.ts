import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GetAllOrdersByUserIdResponseDataRows } from 'src/app/order/order.interface';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() orderDetails: GetAllOrdersByUserIdResponseDataRows;
  @Output() cancelOrder: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCancelOrder(orderId: string): void {
    this.cancelOrder.emit(orderId);
  }
}
