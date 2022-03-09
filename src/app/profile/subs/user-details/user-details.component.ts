import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService, User } from '@auth0/auth0-angular';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  pageLoding = false;

  public auth0ProfileClaims: User | undefined | null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.pageLoding = true;

    this.subs.sink = this.auth.user$.subscribe((user) => {
      this.auth0ProfileClaims = user;
      this.pageLoding = false;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
