import { AddAddressData } from './add-address/add-address.interface';
import { environment } from 'src/environments/environment';
import {
  AddAddressResponse,
  GetAddressesResponse,
  GetAddressResonse,
  GetUserDetailsResponse,
} from './profile.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  async getAddress(addressId: string): Promise<GetAddressResonse> {
    let httpParam: HttpParams;
    httpParam.append('addressId', addressId);
    return await this.httpService
      .get<GetAddressResonse>(BACKEND_URL + '/address/getAddress', {
        params: httpParam,
      })
      .toPromise();
  }

  async getUserDetails(): Promise<GetUserDetailsResponse> {
    return await this.httpService
      .get<GetUserDetailsResponse>(BACKEND_URL + '/user/getUser')
      .toPromise();
  }

  async addAddress(
    addAddressData: AddAddressData,
  ): Promise<AddAddressResponse> {
    return await this.httpService
      .post<AddAddressResponse>(
        BACKEND_URL + '/address/createAddress',
        addAddressData,
      )
      .toPromise();
  }
}
