import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AddToCartData,
  AddToCartResponse,
  DeleteTheItemResponse,
  GetCartResponse,
  GetCartResponseData,
  UpdateQuantityCartData,
  UpdateQuantityCartResponse,
} from './cart.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  environment,
  secureAPIURIs,
  basicAPIURIs,
} from 'src/environments/environment';

const BACKEND_URL = environment.production
  ? environment.backend_url_secure
  : environment.backend_url;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject: BehaviorSubject<GetCartResponseData> =
    new BehaviorSubject<GetCartResponseData>({
      count: 0,
      rows: [],
    });
  private cart: GetCartResponseData;

  constructor(
    private httpService: HttpClient,
    private snackbarService: MatSnackBar,
  ) {}

  get CartObservable(): Observable<GetCartResponseData> {
    return this.cartSubject.asObservable();
  }

  getCart(): void {
    this.httpService
      .get<GetCartResponse>(BACKEND_URL + secureAPIURIs.getCart.url)
      .pipe(map((response) => response.data))
      .subscribe((data) => {
        this.cart = data;
        this.cartSubject.next(data);
      });
  }

  updateQuantityCart(updateQuantityCartData: UpdateQuantityCartData): void {
    this.httpService
      .patch<UpdateQuantityCartResponse>(
        BACKEND_URL + secureAPIURIs.updateQuantityCart.url,
        updateQuantityCartData,
      )
      .subscribe((response) => {
        this.snackbarService.open(response.message, 'Ok', {
          duration: 2 * 1000,
        });
        this.getCart();
      });
  }

  addToCart(addToCartData: AddToCartData): void {
    this.httpService
      .post<AddToCartResponse>(
        BACKEND_URL + secureAPIURIs.addToCart.url,
        addToCartData,
      )
      .subscribe((response) => {
        this.snackbarService.open(response.message, 'Ok', {
          duration: 2 * 1000,
        });
        this.getCart();
      });
  }

  deleteTheItem(cartId: string): void {
    this.httpService
      .delete<DeleteTheItemResponse>(
        BACKEND_URL + secureAPIURIs.deleteTheItem.url + `/?cartId=${cartId}`,
      )
      .subscribe((response) => {
        this.snackbarService.open(response.message, 'Ok', {
          duration: 2 * 1000,
        });
        this.getCart();
      });
  }
}
