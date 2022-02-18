import { SubSink } from 'subsink';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ProductService } from './../../product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { GetAllProductLookaheadWithCategoryImageBySearchResponseDataRow } from 'src/app/product/product.interface';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
  takeUntil,
} from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from 'src/app/auth/auth0.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  isAuthenticated = false;

  sideNavShow = false;

  search = new FormControl('');
  search$ = this.search.valueChanges;

  searchLookaheads$: Observable<
    GetAllProductLookaheadWithCategoryImageBySearchResponseDataRow[]
  >;

  destroyed = new Subject<void>();
  currentScreenSize: string;

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(
    private productService: ProductService,
    private router: Router,
    breakpointObserver: BreakpointObserver,
    private authService: Auth0Service,
    public auth0Service: AuthService,
  ) {
    this.subs.sink = breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  ngOnInit(): void {
    this.subs.sink = this.authService.AuthStatusListener.subscribe(
      (authStatus) => {
        this.isAuthenticated = authStatus;
      },
    );

    this.searchLookaheads$ = this.search$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      filter((search) => search !== ''),
      switchMap((search) =>
        this.productService
          .getAllProductLookaheadWithCategoryImageBySearch(search)
          .pipe(map((data) => data.rows)),
      ),
    );

    this.subs.sink = this.search$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter((search) => search !== ''),
      )
      .subscribe((search) => {
        this.router.navigate(['/search/', encodeURI(search)]);
      });

    this.subs.sink = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        if (event.url.startsWith('/search/')) {
          // if (event.url.split('/')[2]) {
          //   this.search.setValue(decodeURI(event.url.split('/')[2]));
          // }
        } else {
          this.search.setValue('');
        }
      });
  }

  changeSideNavState(state: boolean): void {
    this.sideNavShow = state;
  }

  auth0Login(): void {
    this.auth0Service.loginWithRedirect().subscribe(() => {});
  }

  auth0Logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
