import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService, User } from '@auth0/auth0-angular';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  pageLoding = false;

  public auth0ProfileClaims: User | undefined | null;

  private authStatusSub: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.pageLoding = true;

    this.auth.user$.subscribe((user) => {
      this.auth0ProfileClaims = user;
      this.pageLoding = false;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
