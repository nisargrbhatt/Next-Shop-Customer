import { SubSink } from 'subsink';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ProductService } from './../../product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GetAllProductLookaheadWithCategoryImageBySearchResponseDataRow } from 'src/app/product/product.interface';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  sideNavShow = false;

  search = new FormControl('');
  search$ = this.search.valueChanges;

  searchLookaheads$: Observable<
    GetAllProductLookaheadWithCategoryImageBySearchResponseDataRow[]
  >;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
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
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        if (event.url.startsWith('/search/')) {
          if (event.url.split('/')[2]) {
            this.search.setValue(decodeURI(event.url.split('/')[2]));
          }
        } else {
          this.search.setValue('');
        }
      });
  }

  changeSideNavState(state: boolean): void {
    this.sideNavShow = state;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
