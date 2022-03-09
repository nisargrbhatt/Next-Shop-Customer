import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
// import { SharedModule } from '../shared/shared.module';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ProductCardSmallComponent } from '../shared/product/product-card-small/product-card-small.component';
import { ProductPriceTableComponent } from '../shared/product/product-price-table/product-price-table.component';
import { ProductScrollCardsComponent } from '../shared/product/product-scroll-cards/product-scroll-cards.component';

@NgModule({
  declarations: [
    ProductDashboardComponent,
    ProductCategoryListComponent,
    ProductShowComponent,
    ProductSearchComponent,
    ProductCardSmallComponent,
    ProductPriceTableComponent,
    ProductScrollCardsComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AngularMaterialModule,
    // SharedModule,
    DragScrollModule,
  ],
})
export class ProductModule {}
