import { GetAddressesResponse } from './../profile.interface';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { ProfileService } from './../profile.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '../profile.interface';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/shared/dialog/error/error.component';
import { ResMesComponent } from 'src/app/shared/dialog/res-mes/res-mes.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  private isAuthenticate = false;
  pageLoding = false;
  formLoading = false;

  addresses: Data;

  private authStatusSub: Subscription;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private snackbarService: MatSnackBar,
    private dialogService: MatDialog,
  ) {}

  ngOnInit(): void {
    this.pageLoding = true;

    this.isAuthenticate = this.authService.IsAuth;
    this.authStatusSub = this.authService.AuthStatusListener.subscribe(
      (authStatus) => {
        this.isAuthenticate = authStatus;
        if (!this.isAuthenticate) {
          this.router.navigate(['/login']);
        }
      },
    );
    this.getAddresses();
  }

  async getAddresses(): Promise<void> {
    this.pageLoding = true;

    let getAddressesResponse: GetAddressesResponse;
    try {
      getAddressesResponse = await this.profileService.getAddresses();
    } catch (error) {
      if (error.error instanceof ErrorEvent) {
        console.log(error);
      } else {
        getAddressesResponse = { ...error.error };
      }
    }
    if (getAddressesResponse.valid) {
      this.addresses = getAddressesResponse.data;
    } else {
      // Open Dialog to show dialog data
      if ('dialog' in getAddressesResponse) {
        const resMesDialogRef = this.dialogService.open(ResMesComponent, {
          data: getAddressesResponse.dialog,
          autoFocus: true,
          hasBackdrop: true,
        });
        await resMesDialogRef.afterClosed().toPromise();
      }

      // Open Dialog to show error data
      if ('error' in getAddressesResponse) {
        if (environment.debug) {
          const errorDialogRef = this.dialogService.open(ErrorComponent, {
            data: getAddressesResponse.error,
            autoFocus: true,
            hasBackdrop: true,
          });
          await errorDialogRef.afterClosed().toPromise();
        }
      }
      this.router.navigate(['/']);
    }

    this.pageLoding = false;
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
