import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { GetAllOrdersByUserIdResponseDataRows } from 'src/app/order/order.interface';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() orderDetails: GetAllOrdersByUserIdResponseDataRows;

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
