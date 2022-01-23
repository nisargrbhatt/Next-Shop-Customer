import { SharedModule } from './../shared/shared.module';
import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrderRoutingModule,
    AngularMaterialModule,
    SharedModule,
    RouterModule,
  ],
})
export class OrderModule {}
