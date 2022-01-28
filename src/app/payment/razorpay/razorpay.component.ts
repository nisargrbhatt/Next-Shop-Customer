import { filter, map, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from '../payment.service';
import { GetOrderPrefillsResponseData } from '../payment.interface';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.production
  ? environment.backend_url_secure
  : environment.backend_url;

@Component({
  selector: 'app-razorpay',
  templateUrl: './razorpay.component.html',
  styleUrls: ['./razorpay.component.scss'],
})
export class RazorpayComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  showPageMessage = false;
  showFailedMessage = false;
  showFullyFailedMessage = true;

  razorPayPrefillData: GetOrderPrefillsResponseData;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private snackbarService: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap
      .pipe(
        filter((paramMap: ParamMap) => paramMap.has('orderId')),
        map((paramMap: ParamMap) => paramMap.get('orderId')),
        switchMap((orderId) => this.paymentService.getOrderPrefills(orderId)),
      )
      .subscribe((data) => {
        this.razorPayPrefillData = data;
        this.openRazorPayDialog();
      });
  }

  openRazorPayDialog(): void {
    try {
      const rzpObj = new this.paymentService.nativeWindow.Razorpay({
        ...this.razorPayPrefillData,
        key: environment.razorpay_id,
        callback_url: BACKEND_URL + '/payment/razorpay_payment_callback',
        modal: {
          escape: false,
          ondismiss: () => {
            this.showFullyFailedMessage = false;
            this.showFailedMessage = true;
          },
        },
      });
      rzpObj.open();
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
