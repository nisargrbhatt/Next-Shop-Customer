import {
  CancelOrderResponse,
  CreateSingleProductOrderData,
  CreateSingleProductOrderResponse,
  CreateSingleProductOrderResponseData,
  GetOrderPrefillsResponse,
  GetOrderPrefillsResponseData,
  PaymentDoneData,
  PaymentDoneResponse,
} from './payment.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

function _window(): any {
  // return the global native browser window object
  return window;
}

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
export class PaymentService {
  constructor(
    private httpService: HttpClient,
    private router: Router,
    private snackbarService: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }

  createSingleProductOrder(
    createSingleProductOrderData: CreateSingleProductOrderData,
  ): Observable<CreateSingleProductOrderResponseData> {
    return this.httpService
      .post<CreateSingleProductOrderResponse>(
        BACKEND_URL + secureAPIURIs.createSingleProductOrder.url,
        createSingleProductOrderData,
      )
      .pipe(map((response) => response.data));
  }

  getOrderPrefills(orderId: string): Observable<GetOrderPrefillsResponseData> {
    return this.httpService
      .get<GetOrderPrefillsResponse>(
        BACKEND_URL +
          secureAPIURIs.getOrderPrefills.url +
          `/?orderId=${orderId}`,
      )
      .pipe(map((response) => response.data));
  }

  paymentDone(paymentDoneData: PaymentDoneData): Observable<boolean> {
    return this.httpService
      .post<PaymentDoneResponse>(
        BACKEND_URL + secureAPIURIs.paymentDone.url,
        paymentDoneData,
      )
      .pipe(map((response) => true));
  }

  cancelOrder(orderId: string): Observable<boolean> {
    return this.httpService
      .delete<CancelOrderResponse>(
        BACKEND_URL + secureAPIURIs.cancelOrder.url + `/?orderId=${orderId}`,
      )
      .pipe(map((response) => true));
  }
}
