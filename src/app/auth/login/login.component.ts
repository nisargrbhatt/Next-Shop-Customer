import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  pageLoading = false;
  loginLoading = false;
  disableControl = false;

  // Password Input Consts
  showPassword = false;
  passwordCapitalLetter = false;
  passwordSpecialLetter = false;
  passwordNumber = false;

  constructor(
    private authService: AuthService,
    private snackbarService: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.pageLoading = true;
    this.loginForm = new FormGroup({
      email: new FormControl(
        { value: '', disabled: this.disableControl },
        {
          validators: [Validators.email, Validators.required],
        },
      ),
      password: new FormControl(
        { value: '', disabled: this.disableControl },
        {
          validators: [Validators.required],
        },
      ),
    });

    this.pageLoading = false;
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginLoading = true;
    this.disableControl = true;
    this.disableControl = true;
    this.loginLoading = true;
  }

  passwordErrorChecker(data: any): void {
    this.passwordCapitalLetter = this.passwordHasCapitalLetter(
      data.target.value,
    );
    this.passwordSpecialLetter = this.passwordHasSpecialLetter(
      data.target.value,
    );
    this.passwordNumber = this.passwordHasNumber(data.target.value);
  }
  passwordHasNumber(password: string): boolean {
    return !!password.match('(?=.*[0-9])');
  }
  passwordHasSpecialLetter(password: string): boolean {
    return !!password.match('(?=.*[@$!%*?&])');
  }
  passwordHasCapitalLetter(password: string): boolean {
    return !!password.match('(?=.*[A-Z])');
  }
}
