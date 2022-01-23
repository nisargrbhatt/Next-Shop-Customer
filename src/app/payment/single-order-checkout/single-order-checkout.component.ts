import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/profile/profile.service';
import { SubSink } from 'subsink';
import { Auth0Service } from './../../auth/auth0.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PriceService } from './../../product/price.service';
import { ProductService } from './../../product/product.service';
import { PaymentService } from './../payment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { PriceData } from 'src/app/product/price.interface';
import { FullProductData } from 'src/app/product/product.interface';
import { GetAddressesData } from 'src/app/profile/profile.interface';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CreateSingleProductOrderData } from '../payment.interface';

@Component({
  selector: 'app-single-order-checkout',
  templateUrl: './single-order-checkout.component.html',
  styleUrls: ['./single-order-checkout.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true },
    },
  ],
})
export class SingleOrderCheckoutComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  isAuthenticated = false;

  priceData: PriceData;
  productData: FullProductData;
  addressesData: GetAddressesData;

  addressForm: FormGroup;
  productForm: FormGroup;

  constructor(
    private paymentService: PaymentService,
    private productService: ProductService,
    private priceService: PriceService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: Auth0Service,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.authService.AuthStatusListener.subscribe(
      (authStatus) => {
        this.isAuthenticated = authStatus;
        if (!this.isAuthenticated) {
          this.authService.login();
        }
      },
    );

    this.subs.sink = this.route.paramMap
      .pipe(
        filter(
          (paramMap: ParamMap) =>
            paramMap.has('priceId') && paramMap.has('productId'),
        ),
        map((paramMap: ParamMap) => [
          paramMap.get('priceId'),
          paramMap.get('productId'),
        ]),
        switchMap(([priceId, productId]) =>
          forkJoin([
            this.priceService.getPrice(priceId),
            this.productService.getProductWithCategory(productId),
            this.profileService.getAddressesSub(),
          ]),
        ),
      )
      .subscribe((results) => {
        this.priceData = results[0];
        this.productData = results[1];
        this.addressesData = results[2];
      });

    this.addressForm = new FormGroup({
      addressId: new FormControl('', {
        validators: [Validators.required],
      }),
    });
    this.productForm = new FormGroup({
      quantity: new FormControl(1, {
        validators: [Validators.required, Validators.min(1), Validators.max(5)],
      }),
    });
  }

  buyNow(): void {
    if (this.addressForm.invalid || this.productForm.invalid) {
      return;
    }

    const createSingleProductOrderData: CreateSingleProductOrderData = {
      addressId: this.addressForm.value.addressId,
      priceId: this.priceData.id,
      productId: this.productData.id,
      quantity: this.productForm.value.quantity,
    };

    this.paymentService
      .createSingleProductOrder(createSingleProductOrderData)
      .subscribe((data) => {
        this.router.navigate(['/buy/pay/', data.order_id]);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
