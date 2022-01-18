import { SubSink } from 'subsink';
import { FormControl, Validators } from '@angular/forms';
import { CartService } from './../../../cart/cart.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CartData } from 'src/app/cart/cart.interface';

@Component({
  selector: 'app-cart-show-edit',
  templateUrl: './cart-show-edit.component.html',
  styleUrls: ['./cart-show-edit.component.scss'],
})
export class CartShowEditComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  @Input() cartItem: CartData;

  quantity: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.min(1), Validators.max(5)],
  });
  private quantity$ = this.quantity.valueChanges;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.quantity.setValue(this.cartItem.quantity);
    this.subs.sink = this.quantity$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((quantityChanged) => {
        if (this.quantity.valid) {
          this.cartService.updateQuantityCart({
            cartId: this.cartItem.id,
            quantity: quantityChanged,
          });
        }
      });
  }

  removeTheItem(): void {
    this.cartService.deleteTheItem(this.cartItem.id);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
