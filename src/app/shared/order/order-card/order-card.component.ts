import { Component, Input, OnInit } from '@angular/core';

import { OrderCardData } from '../order.interface';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() orderDetails: OrderCardData;

  constructor() {}

  ngOnInit(): void {}
}
