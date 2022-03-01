import { SubSink } from 'subsink';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import {
  GetAllProductWithCategoryImageByCategoryIdResponseData,
  ProductData,
} from '../product.interface';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ProductCardSmallDetails } from 'src/app/shared/product/product.interface';
import { SeoService } from 'src/app/seo.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  search: string | null = '';

  searchData: GetAllProductWithCategoryImageByCategoryIdResponseData;

  currentPage = new FormControl(1);
  currentPage$ = this.currentPage.valueChanges;

  pageSize = 10;

  totalProducts = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap
      .pipe(
        filter((paramMap: ParamMap) => paramMap.has('search')),
        switchMap((paramMap: ParamMap) => {
          this.search = paramMap.get('search');
          return this.productService.getAllProductWithCategoryImageBySearch(
            this.currentPage.value,
            this.pageSize,
            this.search,
          );
        }),
      )
      .subscribe((data) => {
        this.searchData = data;
        this.totalProducts = data.count;
        this.seo.setTitle(`Search: ${this.search}`);
      });
  }

  onPageChange(pageData: PageEvent): void {
    this.currentPage.setValue(pageData.pageIndex + 1);
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

  getReviewStar(product: ProductData): [number, number] {
    const total = product.reviewes.length;
    if (!total) {
      return [0, 0];
    }
    const sum = product.reviewes.reduce((previous, current) => {
      return previous + current.stars;
    }, 0);
    return [Math.floor(sum / total), total];
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
