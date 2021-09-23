import { environment } from 'src/environments/environment';
import { GetAddressesResponse } from './profile.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BACKEND_URL = environment.production
  ? environment.backend_url_secure
  : environment.backend_url;
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpService: HttpClient) {}

  async getAddresses(): Promise<GetAddressesResponse> {
    return await this.httpService
      .get<GetAddressesResponse>(BACKEND_URL + '/address/getAddresses')
      .toPromise();
  }
}
