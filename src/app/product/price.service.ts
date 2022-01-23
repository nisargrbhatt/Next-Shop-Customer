import { map } from 'rxjs/operators';
import { GetPriceResponse, PriceData } from './price.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
export class PriceService {
  constructor(private httpService: HttpClient) {}

  getPrice(priceId: string): Observable<PriceData> {
    return this.httpService
      .get<GetPriceResponse>(
        BACKEND_URL + secureAPIURIs.getPrice.url + `/?priceId=${priceId}`,
      )
      .pipe(map((response) => response.data));
  }
}
