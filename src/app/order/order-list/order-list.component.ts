import { GetAllOrdersByUserIdResponseData } from './../order.interface';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { OrderService } from './../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  currentPage = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPage.asObservable();

  pageSize = 10;

  totalOrders = 0;

  orderData: GetAllOrdersByUserIdResponseData;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.subs.sink = this.currentPage$
      .pipe(
        distinctUntilChanged(),
        switchMap((currentPage) =>
          this.orderService.getAllOrdersByUserId(currentPage, this.pageSize),
        ),
      )
      .subscribe((data) => {
        this.orderData = data;
        this.totalOrders = data.count;
      });
  }

  onPageChange(pageData: PageEvent): void {
    this.currentPage.next(pageData.pageIndex + 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
