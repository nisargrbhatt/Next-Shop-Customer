import { GetCartResponseData } from './../cart.interface';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.scss'],
})
export class ShowCartComponent implements OnInit {
  private subs = new SubSink();

  cartData: GetCartResponseData;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subs.sink = this.cartService.CartObservable.subscribe((data) => {
      this.cartData = data;
    });
  }
}
