import { EmailValidator } from './email.validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isAuthenticated = false;
  pageLoading = false;
  signupLoading = false;
  disableControl = false;

  // Password Input Consts
  showPassword = false;
  passwordCapitalLetter = false;
  passwordSpecialLetter = false;
  passwordNumber = false;

  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private emailValidator: EmailValidator,
  ) {}

  ngOnInit(): void {
    this.pageLoading = true;

    this.signupForm = new FormGroup({
      name: new FormControl(
        { value: '', disabled: this.disableControl },
        {
          validators: [Validators.required],
        },
      ),
      contact_no: new FormControl(
        { value: '', disabled: this.disableControl },
        {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('(?=.*[0-9])'),
          ],
        },
      ),
      email: new FormControl(
        { value: '', disabled: this.disableControl },
        {
          validators: [Validators.email, Validators.required],
          asyncValidators: [
            this.emailValidator.checkEmail.bind(this.emailValidator),
          ],
        },
      ),
      password: new FormControl(
        { value: '', disabled: this.disableControl },
        {
          validators: [Validators.required, Validators.minLength(8)],
        },
      ),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.signupForm.invalid) {
      return;
    }
    this.signupLoading = true;
    this.disableControl = true;
    this.disableControl = true;
    this.signupLoading = true;
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
