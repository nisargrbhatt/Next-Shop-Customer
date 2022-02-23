import { GetAllOrdersByUserIdResponseData } from './../order.interface';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { OrderService } from './../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { PaymentService } from 'src/app/payment/payment.service';

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

  mybreakpoint: number;

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService,
  ) {}

  ngOnInit(): void {
    this.mybreakpoint = window.innerWidth <= 1000 ? 2 : 4;
    if (window.innerWidth <= 532) {
      this.mybreakpoint = 1;
    }
    this.subs.sink = this.currentPage$
      .pipe(
        debounceTime(200),
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

  onRefresh(): void {
    this.currentPage.next(1);
  }

  onCancelOrder(orderId: string): void {
    this.paymentService.cancelOrder(orderId).subscribe((_) => {
      this.onRefresh();
    });
  }

  handleSize(event: any): void {
    this.mybreakpoint = event.target.innerWidth <= 1000 ? 2 : 4;
    if (event.target.innerWidth <= 532) {
      this.mybreakpoint = 1;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
