import { UserData } from './auth.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.backend_url;

@Injectable({
  providedIn: 'any',
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private userData: UserData;

  private authStatusListener = new Subject<boolean>();

  constructor(private httpService: HttpClient, private router: Router) {}

  get Token(): string {
    return this.token;
  }
  get UserId(): string {
    return this.userId;
  }
  get UserData(): UserData {
    return this.userData;
  }
  get IsAuth(): boolean {
    return this.isAuthenticated;
  }
  get AuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }
  checkEmail(email: string): Observable<{ ok: boolean }> {
    email = email.replace(' ', '').replace('[$!%*?&/]', '');
    return this.httpService.get<{ ok: boolean }>(BACKEND_URL + '' + email);
  }
}
