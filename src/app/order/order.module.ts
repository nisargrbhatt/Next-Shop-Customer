// import { SharedModule } from './../shared/shared.module';
import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderShowComponent } from './order-show/order-show.component';
import { OrderCardComponent } from '../shared/order/order-card/order-card.component';

@NgModule({
  declarations: [OrderListComponent, OrderShowComponent, OrderCardComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    AngularMaterialModule,
    // SharedModule,
    RouterModule,
  ],
})
export class OrderModule {}
