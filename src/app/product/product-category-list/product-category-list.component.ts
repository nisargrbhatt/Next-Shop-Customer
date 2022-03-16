import { ProductService } from './../product.service';
import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  GetAllProductWithCategoryImageByCategoryIdResponseData,
  ProductData,
} from '../product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ProductCardSmallDetails } from 'src/app/shared/product/product.interface';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss'],
})
export class ProductCategoryListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  currentPage = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPage.asObservable();

  pageSize = 10;

  totalProducts = 0;

  categoryId: string;

  search = new FormControl('');
  search$ = this.search.valueChanges;

  searchData: GetAllProductWithCategoryImageByCategoryIdResponseData;

  categoryData: GetAllProductWithCategoryImageByCategoryIdResponseData;

  mybreakpoint: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.mybreakpoint = window.innerWidth <= 1000 ? 2 : 4;
    if (window.innerWidth <= 532) {
      this.mybreakpoint = 1;
    }
    if (this.route.snapshot.params['id']) {
      this.categoryId = this.route.snapshot.params['id'];
    }

    this.subs.sink = this.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((search) => search !== ''),
        switchMap((search) =>
          this.productService.getAllProductWithCategoryImageByCategoryId(
            this.categoryId,
            this.currentPage.getValue(),
            this.pageSize,
            search,
          ),
        ),
      )
      .subscribe((data) => {
        this.categoryData = data;
        this.totalProducts = data.count;
      });

    this.subs.sink = this.currentPage$
      .pipe(
        distinctUntilChanged(),
        switchMap((currentPage) =>
          this.productService.getAllProductWithCategoryImageByCategoryId(
            this.categoryId,
            currentPage,
            this.pageSize,
            this.search.value,
          ),
        ),
      )
      .subscribe((data) => {
        this.categoryData = data;
        this.totalProducts = data.count;
      });
  }

  onPageChange(pageData: PageEvent): void {
    this.currentPage.next(pageData.pageIndex + 1);
  }

  onProductClick(slug: string): void {
    this.router.navigate(['/', slug]);
  }

  handleSize(event: any): void {
    this.mybreakpoint = event.target.innerWidth <= 1000 ? 2 : 4;
    if (event.target.innerWidth <= 532) {
      this.mybreakpoint = 1;
    }
  }

  getProductCardDetails(product: ProductData): ProductCardSmallDetails {
    return {
      id: product.id,
      category: product?.category?.name,
      image: product?.images[0]?.url,
      name: product.name,
      slug: product.slug,
    };
  }

  getReviewStar(product: ProductData): [number, number] {
    const total = product?.reviewes?.length;
    if (!total) {
      return [0, 0];
    }
    const sum = product?.reviewes?.reduce((previous, current) => {
      return previous + current.stars;
    }, 0);
    return [Math.floor(sum / total), total];
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
