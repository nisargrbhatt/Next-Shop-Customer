import { SharedService } from './../shared/shared.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AddActivityData,
  AddActivityResponse,
  FullProductData,
  GetAllProductLookaheadWithCategoryImageBySearchResponse,
  GetAllProductLookaheadWithCategoryImageBySearchResponseData,
  GetAllProductWithCategoryImageByCategoryIdResponse,
  GetAllProductWithCategoryImageByCategoryIdResponseData,
  GetAllProductWithCategoryImageBySearchResponse,
  GetProductWithCategoryPriceReviewManufacturerResponse,
  GetRecommendedProductsResponse,
  GetRecommendedProductsResponseData,
} from './product.interface';

import {
  environment,
  secureAPIURIs,
  basicAPIURIs,
} from 'src/environments/environment';

const BACKEND_URL = environment.production
  ? environment.backend_url_secure
  : environment.backend_url;

const MODEL_BACKEND_URL = environment.backend_model_url;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpService: HttpClient,
    private sharedService: SharedService,
  ) {}

  getProductWithCategoryPriceReviewManufacturer(
    productSlug: string,
  ): Observable<FullProductData> {
    return this.httpService
      .get<GetProductWithCategoryPriceReviewManufacturerResponse>(
        BACKEND_URL +
          basicAPIURIs.getProductWithCategoryPriceReviewManufacturer +
          `/?productSlug=${productSlug}`,
      )
      .pipe(map((response) => response.data));
  }

  getAllProductWithCategoryImageByCategoryId(
    categoryId: string,
    currentPage: number,
    pageSize: number,
    search?: string,
  ): Observable<GetAllProductWithCategoryImageByCategoryIdResponseData> {
    return this.httpService
      .get<GetAllProductWithCategoryImageByCategoryIdResponse>(
        BACKEND_URL +
          basicAPIURIs.getAllProductWithCategoryImageByCategoryId +
          `/?categoryId=${categoryId}&currentPage=${currentPage}&pageSize=${pageSize}&search=${encodeURI(
            this.sharedService.searchFilter(search),
          )}`,
      )
      .pipe(map((response) => response.data));
  }

  getAllProductWithCategoryImageBySearch(
    currentPage: number,
    pageSize: number,
    search?: string | null,
  ): Observable<GetAllProductWithCategoryImageByCategoryIdResponseData> {
    return this.httpService
      .get<GetAllProductWithCategoryImageBySearchResponse>(
        BACKEND_URL +
          basicAPIURIs.getAllProductWithCategoryImageBySearch +
          `/?currentPage=${currentPage}&pageSize=${pageSize}&search=${this.sharedService.searchFilter(
            search,
          )}`,
      )
      .pipe(map((response) => response.data));
  }

  getAllProductLookaheadWithCategoryImageBySearch(
    search?: string,
  ): Observable<GetAllProductLookaheadWithCategoryImageBySearchResponseData> {
    return this.httpService
      .get<GetAllProductLookaheadWithCategoryImageBySearchResponse>(
        BACKEND_URL +
          basicAPIURIs.getAllProductLookaheadWithCategoryImageBySearch +
          `/?search=${encodeURI(this.sharedService.searchFilter(search))}`,
      )
      .pipe(map((response) => response.data));
  }

  getProductWithCategory(productId: string): Observable<FullProductData> {
    return this.httpService
      .get<GetProductWithCategoryPriceReviewManufacturerResponse>(
        BACKEND_URL +
          basicAPIURIs.getProductWithCategory +
          `/?productId=${productId}`,
      )
      .pipe(map((response) => response.data));
  }

  addActivity(
    addActivityData: AddActivityData,
  ): Observable<AddActivityResponse> {
    return this.httpService.post<AddActivityResponse>(
      MODEL_BACKEND_URL + secureAPIURIs.addActivity.url,
      addActivityData,
    );
  }

  getRecommendedProducts(): Observable<GetRecommendedProductsResponseData> {
    return this.httpService
      .get<GetRecommendedProductsResponse>(
        MODEL_BACKEND_URL + secureAPIURIs.getRecommendedProducts.url,
      )
      .pipe(map((response) => response.data));
  }
}
