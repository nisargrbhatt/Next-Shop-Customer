import { GetCartResponse } from './cart.interface';
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
export class CartService {
  constructor(private httpService: HttpClient) {}

  async getCart(): Promise<GetCartResponse> {
    return await this.httpService
      .get<GetCartResponse>(BACKEND_URL + secureAPIURIs.getCart.url)
      .toPromise();
  }
}
