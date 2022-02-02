import { CategoryService } from './../category.service';

import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  GetRecommendedProductsResponseData,
  ProductData,
} from '../product.interface';
import { Router } from '@angular/router';

import { ProductCardSmallDetails } from 'src/app/shared/product/product.interface';
import { GetAllCategoriesWithFiveProductsResponseData } from '../category.interface';
import { Auth0Service } from 'src/app/auth/auth0.service';
import { filter, switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss'],
})
export class ProductDashboardComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  categoryData: GetAllCategoriesWithFiveProductsResponseData;

  recommendedData: GetRecommendedProductsResponseData;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private auth0Service: AuthService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.auth0Service.isAuthenticated$
      .pipe(
        filter((authStatus) => authStatus === true),
        switchMap((_) => this.productService.getRecommendedProducts()),
      )
      .subscribe((data) => {
        this.recommendedData = data;
      });

    this.subs.sink = this.categoryService
      .getAllCategoriesWithFiveProducts()
      .subscribe((data) => {
        this.categoryData = data;
      });
  }

  onProductClick(slug: string): void {
    this.router.navigate(['/', slug]);
  }

  getProductCardDetails(product: ProductData): ProductCardSmallDetails {
    return {
      id: product.id,
      category: product.category.name,
      image: product.images[0].url,
      name: product.name,
      slug: product.slug,
    };
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
