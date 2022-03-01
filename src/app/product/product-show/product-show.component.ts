import { CartService } from './../../cart/cart.service';
import { Auth0Service } from './../../auth/auth0.service';
import { FullProductData } from './../product.interface';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { SeoService } from 'src/app/seo.service';
import { MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss'],
})
export class ProductShowComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  isAuthenticated: boolean;

  productSlug: string;

  productDetails: FullProductData;

  selectedImage = 0;

  reviewStar = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: Auth0Service,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['slug']) {
      this.productSlug = this.route.snapshot.params['slug'];
    }

    this.subs.sink = this.authService.AuthStatusListener.subscribe(
      (authStatus) => {
        this.isAuthenticated = authStatus;
      },
    );

    this.subs.sink = this.productService
      .getProductWithCategoryPriceReviewManufacturer(this.productSlug)
      .subscribe((data) => {
        this.productDetails = {
          ...data,
          specification: JSON.parse(data.specification),
        };
        const metas: MetaDefinition[] = [
          {
            property: 'og:title',
            content: this.productDetails.name,
          },
          {
            property: 'og:description',
            content: this.productDetails.small_description,
          },
          {
            property: 'og:image',
            content:
              this.productDetails?.images[0]?.url ||
              'https://firebasestorage.googleapis.com/v0/b/next-shop-59dce.appspot.com/o/Statics%2FBrand-Black.jpg?alt=media&token=44d478db-1362-491b-86e4-749ee5d4ffa1',
          },
          {
            property: 'og:url',
            content: window.location.href,
          },
          {
            property: 'og:locale',
            content: 'en_IN',
          },
        ];

        metas.forEach((meta) => {
          this.seo.setMeta(meta);
        });
        this.seo.setTitle(this.productDetails.name);

        this.findReviewStar();
      });
  }

  findReviewStar(): void {
    const total = this.productDetails.reviewes.length;
    if (!total) {
      this.reviewStar = 0;
      return;
    }
    const sum = this.productDetails.reviewes.reduce((previous, current) => {
      return previous + current.stars;
    }, 0);
    this.reviewStar = Math.floor(sum / total);
  }

  addToCart(id: string): void {
    if (this.isAuthenticated) {
      this.cartService.addToCart({
        priceId: id,
        productId: this.productDetails.id,
        quantity: 1,
      });
    } else {
      this.authService.login();
    }
  }

  removeToCart(id: string): void {
    if (this.isAuthenticated) {
      this.cartService.deleteTheItem(id);
    }
  }

  ngOnDestroy(): void {
    if (this.isAuthenticated && this.productDetails) {
      const ttl = Math.round(window.performance.now() / 1000);
      this.productService
        .addActivity({
          productId: this.productDetails.id,
          isBounce: ttl < 10,
          isHit: ttl >= 10,
          timeToLive: ttl,
        })
        .subscribe((_) => {});
    }
    this.subs.unsubscribe();
  }
}
