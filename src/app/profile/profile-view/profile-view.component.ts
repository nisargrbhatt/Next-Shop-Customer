import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { ProfileService } from './../profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  private isAuthenticate = false;
  pageLoding = false;

  private authStatusSub:Subscription;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private snackbarService:MatSnackBar
  ) {}

  ngOnInit(): void {}
}
