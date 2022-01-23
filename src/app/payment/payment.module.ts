import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AngularMaterialModule } from './../angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { SingleOrderCheckoutComponent } from './single-order-checkout/single-order-checkout.component';
import { RazorpayComponent } from './razorpay/razorpay.component';

@NgModule({
  declarations: [SingleOrderCheckoutComponent, RazorpayComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    AngularMaterialModule,
    SharedModule,
    RouterModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentModule {}
