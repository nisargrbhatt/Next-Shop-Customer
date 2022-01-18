import { Router } from '@angular/router';
import { ProductCardSmallDetails } from './../product.interface';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/product/category.interface';

@Component({
  selector: 'app-product-scroll-cards',
  templateUrl: './product-scroll-cards.component.html',
  styleUrls: ['./product-scroll-cards.component.scss'],
})
export class ProductScrollCardsComponent implements OnInit {
  @Input() productsDetails: Product[];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  getProductDetails(product: Product): ProductCardSmallDetails {
    return {
      name: product.name,
      category: product.category.name,
      id: product.id,
      image: product.images[0].url,
      slug: product.slug,
    };
  }

  cardClick(slug: string): void {
    this.router.navigate(['/', slug]);
  }
}
