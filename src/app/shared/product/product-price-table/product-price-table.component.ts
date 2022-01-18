import { CartService } from './../../../cart/cart.service';
import { SubSink } from 'subsink';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetCartResponseData } from 'src/app/cart/cart.interface';
import { PriceData } from 'src/app/product/product.interface';

@Component({
  selector: 'app-product-price-table',
  templateUrl: './product-price-table.component.html',
  styleUrls: ['./product-price-table.component.scss'],
})
export class ProductPriceTableComponent implements OnInit, AfterViewInit {
  @Input() priceData: PriceData[];
  @Output() addToCart: EventEmitter<string> = new EventEmitter<string>();
  @Output() removeToCart: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subs = new SubSink();

  dataSource: MatTableDataSource<PriceData>;
  displayedColumns: string[] = ['merchant_name', 'price', 'action'];

  cartItems: GetCartResponseData;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subs.sink = this.cartService.CartObservable.subscribe((cartData) => {
      this.cartItems = cartData;
    });
    this.dataSource = new MatTableDataSource(this.priceData);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onAddToCart(id: string): void {
    this.addToCart.emit(id);
  }

  onRemoveToCart(id: string): void {
    this.removeToCart.emit(
      this.cartItems.rows[
        this.cartItems.rows.findIndex((data) => data.priceId === id)
      ].id,
    );
  }

  checkInCart(id: string): boolean {
    const index = this.cartItems.rows.findIndex((data) => data.priceId === id);

    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }
}
