import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Auth0Service } from './auth/auth0.service';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Next Shop';
  metas: MetaDefinition[] = [
    {
      property: 'og:title',
      content: 'Next Shop',
    },
    {
      property: 'og:description',
      content: 'Next Shop is a merchant-first e-commerce web app.',
    },
    {
      property: 'og:image',
      content:
        'https://firebasestorage.googleapis.com/v0/b/next-shop-59dce.appspot.com/o/Statics%2FBrand-Black.jpg?alt=media&token=44d478db-1362-491b-86e4-749ee5d4ffa1',
    },
    {
      property: 'og:url',
      content: window.location.href,
    },
    {
      property: 'og:locale',
      content: 'en_IN',
    },
  ];

  constructor(
    private authService: Auth0Service,
    private seo: SeoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.metas.forEach((meta) => {
      this.seo.setMeta(meta);
    });
    this.seo.setTitle(this.title);
    this.authService.autoAuth0();

    this.router.events
      .pipe(filter((e: Event) => e instanceof NavigationEnd && e.url === '/'))
      .subscribe((e: any) => {
        this.metas.forEach((meta) => {
          this.seo.setMeta(meta);
        });
        this.seo.setTitle(this.title);
      });
  }
}
