import { map } from 'rxjs/operators';
import {
  GetAllOrdersByUserIdResponse,
  GetAllOrdersByUserIdResponseData,
  GetAllOrdersByUserIdResponseDataRows,
  GetOrderResponse,
} from './order.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
export class OrderService {
  constructor(private httpService: HttpClient) {}

  getAllOrdersByUserId(
    currentPage: number,
    pageSize: number,
  ): Observable<GetAllOrdersByUserIdResponseData> {
    return this.httpService
      .get<GetAllOrdersByUserIdResponse>(
        BACKEND_URL +
          secureAPIURIs.getAllOrdersByUserId.url +
          `/?currentPage=${currentPage}&pageSize=${pageSize}`,
      )
      .pipe(map((response) => response.data));
  }

  getOrder(orderId: string): Observable<GetAllOrdersByUserIdResponseDataRows> {
    return this.httpService
      .get<GetOrderResponse>(
        BACKEND_URL + secureAPIURIs.getOrder.url + `/?orderId=${orderId}`,
      )
      .pipe(map((response) => response.data));
  }
}
