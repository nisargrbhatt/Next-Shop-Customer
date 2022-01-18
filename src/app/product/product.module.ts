import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { NgxViewerModule } from 'ngx-viewer';

@NgModule({
  declarations: [
    ProductDashboardComponent,
    ProductCategoryListComponent,
    ProductShowComponent,
    ProductSearchComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AngularMaterialModule,
    SharedModule,
    NgxViewerModule,
  ],
})
export class ProductModule {}
