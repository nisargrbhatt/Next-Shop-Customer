import { Router } from '@angular/router';
import { ProductCardSmallDetails } from './../product.interface';
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/product/category.interface';

@Component({
  selector: 'app-product-scroll-cards',
  templateUrl: './product-scroll-cards.component.html',
  styleUrls: ['./product-scroll-cards.component.scss'],
})
export class ProductScrollCardsComponent {
  @Input() productsDetails: Product[];

  constructor(private router: Router) {}

  getProductDetails(product: Product): ProductCardSmallDetails {
    return {
      name: product.name,
      category: product.category.name,
      id: product.id,
      image: product.images[0].url,
      slug: product.slug,
    };
  }

  getReviewStar(product: Product): [number, number] {
    const total = product.reviewes.length;
    if (!total) {
      return [0, 0];
    }
    const sum = product.reviewes.reduce((previous, current) => {
      return previous + current.stars;
    }, 0);
    return [Math.floor(sum / total), total];
  }

  cardClick(slug: string): void {
    this.router.navigate(['/', slug]);
  }
}
