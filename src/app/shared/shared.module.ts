import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './../angular-material.module';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './dialog/error/error.component';
import { ResMesComponent } from './dialog/res-mes/res-mes.component';
import { LoaderComponent } from './loader/loader.component';
// import { CartShowEditComponent } from './cart/cart-show-edit/cart-show-edit.component';
// import { ProductCardSmallComponent } from './product/product-card-small/product-card-small.component';
// import { ProductPriceTableComponent } from './product/product-price-table/product-price-table.component';
// import { ProductScrollCardsComponent } from './product/product-scroll-cards/product-scroll-cards.component';
// import { DragScrollModule } from 'ngx-drag-scroll';
// import { OrderCardComponent } from './order/order-card/order-card.component';
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    // DragScrollModule,
  ],
  declarations: [
    HeaderComponent,
    ErrorComponent,
    ResMesComponent,

    LoaderComponent,
    // CartShowEditComponent,
    // ProductCardSmallComponent,
    // ProductPriceTableComponent,
    // ProductScrollCardsComponent,
    // OrderCardComponent,
  ],
  providers: [],
  exports: [
    HeaderComponent,
    ErrorComponent,
    ResMesComponent,

    LoaderComponent,
    // CartShowEditComponent,
    // ProductCardSmallComponent,
    // ProductPriceTableComponent,
    // ProductScrollCardsComponent,
    // OrderCardComponent,
  ],
})
export class SharedModule {}
