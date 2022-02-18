import { GetCartResponseData } from './../cart.interface';
import { CartService } from './../cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.scss'],
})
export class ShowCartComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  cartData: GetCartResponseData;

  mybreakpoint: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.mybreakpoint = window.innerWidth <= 1000 ? 2 : 4;
    if (window.innerWidth <= 532) {
      this.mybreakpoint = 1;
    }
    this.subs.sink = this.cartService.CartObservable.subscribe((data) => {
      this.cartData = data;
    });
  }

  handleSize(event: any): void {
    this.mybreakpoint = event.target.innerWidth <= 1000 ? 2 : 4;
    if (event.target.innerWidth <= 532) {
      this.mybreakpoint = 1;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
