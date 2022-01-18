import { CategoryService } from './../category.service';

import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductData } from '../product.interface';
import { Router } from '@angular/router';

import { ProductCardSmallDetails } from 'src/app/shared/product/product.interface';
import { GetAllCategoriesWithFiveProductsResponseData } from '../category.interface';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss'],
})
export class ProductDashboardComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  categoryData: GetAllCategoriesWithFiveProductsResponseData;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
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
