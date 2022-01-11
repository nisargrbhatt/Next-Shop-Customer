import { Subscription } from 'rxjs';

import { Auth0Service } from '../../auth/auth0.service';

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  private isAuthenticate = false;
  pageLoding = false;
  formLoading = false;

  private authStatusSub: Subscription;

  constructor(private authService: Auth0Service) {}

  ngOnInit(): void {
    this.pageLoding = true;

    this.isAuthenticate = this.authService.IsAuth;
    this.authStatusSub = this.authService.AuthStatusListener.subscribe(
      (authStatus) => {
        this.isAuthenticate = authStatus;
      },
    );
    this.pageLoding = false;
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
