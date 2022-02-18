import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth0Service } from 'src/app/auth/auth0.service';
import { ReviewData } from 'src/app/product/product.interface';
import { ProductCardSmallDetails } from 'src/app/shared/product/product.interface';
import { SubSink } from 'subsink';
import {
  GetAllOrdersByUserIdResponseDataRows,
  Product,
} from '../order.interface';
import { OrderService } from '../order.service';

import { AddReviewData, UpdateReviewData } from '../review.interface';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-order-show',
  templateUrl: './order-show.component.html',
  styleUrls: ['./order-show.component.scss'],
})
export class OrderShowComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  orderId: string;
  orderData: GetAllOrdersByUserIdResponseDataRows;

  reviewForm: FormGroup;

  reviewFound = false;
  reviewData: ReviewData;

  private userId: string;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private authService: Auth0Service,
    private reviewService: ReviewService,
    private snackbarService: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.ProfileClaims.userId;
    if (this.route.snapshot.params.orderId) {
      this.orderId = this.route.snapshot.params.orderId;
    }
    this.subs.sink = this.orderService
      .getOrder(this.orderId)
      .subscribe((data) => {
        this.orderData = data;
        this.findReview();
      });

    this.reviewForm = new FormGroup({
      message: new FormControl('', {}),
      stars: new FormControl('', {
        validators: [Validators.required, Validators.min(1), Validators.max(5)],
      }),
    });
  }

  findReview(): void {
    const index = this.orderData.product.reviewes.findIndex((data) => {
      return data.userId === this.userId;
    });

    if (index > -1) {
      this.reviewFound = true;
      this.reviewData = this.orderData.product.reviewes[index];

      this.reviewForm.setValue({
        message: this.reviewData.message,
        stars: this.reviewData.stars,
      });
    }
  }

  getProductCardDetails(product: Product): ProductCardSmallDetails {
    return {
      id: product.id,
      category: product.category.name,
      image: product.images[0].url,
      name: product.name,
      slug: product.slug,
    };
  }

  getReviewStar(product: Product): [number, number] {
    const total = product.reviewes.length;
    if (!total) {
      return [0, 0];
    }
    const sum = product.reviewes.reduce((previous, current) => {
      return previous + current.stars;
    }, 0);
    return [Math.floor(sum / total), total];
  }

  onSubmit(): void {
    if (this.reviewForm.invalid) {
      return;
    }

    const addReviewData: AddReviewData = {
      productId: this.orderData.productId,
      stars: Number(this.reviewForm.value.stars),
      message: this.reviewForm.value.message,
    };

    this.subs.sink = this.reviewService
      .addReview(addReviewData)
      .subscribe((response) => {
        this.snackbarService.open(response.message, 'Ok', {
          duration: 2 * 1000,
        });
        this.router.navigate(['/order']);
      });
  }

  onUpdate(): void {
    if (this.reviewForm.invalid && !this.reviewForm.dirty) {
      return;
    }

    const updateReviewData: UpdateReviewData = {
      reviewId: this.reviewData.id,
      stars: Number(this.reviewForm.value.stars),
      message: this.reviewForm.value.message,
    };

    this.subs.sink = this.reviewService
      .updateReview(updateReviewData)
      .subscribe((response) => {
        this.snackbarService.open(response.message, 'Ok', {
          duration: 2 * 1000,
        });
        this.router.navigate(['/order']);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
