import { CartRoutingModule } from './cart-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { AngularMaterialModule } from './../angular-material.module';
import { ShowCartComponent } from './show-cart/show-cart.component';

@NgModule({
  declarations: [ShowCartComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    CartRoutingModule,
  ],
})
export class CartModule {}
