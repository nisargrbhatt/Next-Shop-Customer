import { ProductShowComponent } from './product-show/product-show.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductDashboardComponent,
  },
  {
    path: 'search/:search',
    component: ProductSearchComponent,
  },
  {
    path: 'category/:id',
    component: ProductCategoryListComponent,
  },
  {
    path: ':slug',
    component: ProductShowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class ProductRoutingModule {}
