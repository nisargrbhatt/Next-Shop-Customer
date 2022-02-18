import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GetAllOrdersByUserIdResponseDataRows } from 'src/app/order/order.interface';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent {
  @Input() orderDetails: GetAllOrdersByUserIdResponseDataRows;
  @Output() cancelOrder: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onCancelOrder(orderId: string): void {
    this.cancelOrder.emit(orderId);
  }
}
