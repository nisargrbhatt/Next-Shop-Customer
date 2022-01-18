import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  GetAllCategoriesWithFiveProductsResponse,
  GetAllCategoriesWithFiveProductsResponseData,
} from './category.interface';
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
export class CategoryService {
  constructor(
    private httpService: HttpClient,
    private snackbarService: MatSnackBar,
    private router: Router,
  ) {}

  getAllCategoriesWithFiveProducts(): Observable<GetAllCategoriesWithFiveProductsResponseData> {
    return this.httpService
      .get<GetAllCategoriesWithFiveProductsResponse>(
        BACKEND_URL + basicAPIURIs.getAllCategoriesWithFiveProducts,
      )
      .pipe(map((response) => response.data));
  }
}
