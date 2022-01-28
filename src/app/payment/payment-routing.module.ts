import { RazorpayComponent } from './razorpay/razorpay.component';
import { SingleOrderCheckoutComponent } from './single-order-checkout/single-order-checkout.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'pay/:orderId',
    component: RazorpayComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':priceId/:productId',
    component: SingleOrderCheckoutComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class PaymentRoutingModule {}
