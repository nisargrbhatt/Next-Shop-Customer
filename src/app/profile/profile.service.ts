import { AddAddressData } from './add-address/add-address.interface';
import {
  environment,
  secureAPIURIs,
  basicAPIURIs,
} from 'src/environments/environment';
import {
  AddAddressResponse,
  EmailOtpCheckResponse,
  GetAddressesResponse,
  GetAddressResonse,
  GetEmailOtpResponse,
  GetUserDetailsResponse,
} from './profile.interface';
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
      .get<GetAddressesResponse>(BACKEND_URL + secureAPIURIs.getAddresses.url)
      .toPromise();
  }

  async getAddress(addressId: string): Promise<GetAddressResonse> {
    return await this.httpService
      .get<GetAddressResonse>(
        BACKEND_URL + secureAPIURIs.getAddress.url + `/?addressId=${addressId}`,
      )
      .toPromise();
  }

  async getUserDetails(): Promise<GetUserDetailsResponse> {
    return await this.httpService
      .get<GetUserDetailsResponse>(BACKEND_URL + secureAPIURIs.getUser.url)
      .toPromise();
  }

  async addAddress(
    addAddressData: AddAddressData,
  ): Promise<AddAddressResponse> {
    return await this.httpService
      .post<AddAddressResponse>(
        BACKEND_URL + secureAPIURIs.createAddress.url,
        addAddressData,
      )
      .toPromise();
  }

  async getEmailOtp(): Promise<GetEmailOtpResponse> {
    return await this.httpService
      .get<GetEmailOtpResponse>(BACKEND_URL + secureAPIURIs.getEmailOtp.url)
      .toPromise();
  }

  async emailOtpCheck(otpBody: {
    otp: string;
  }): Promise<EmailOtpCheckResponse> {
    return await this.httpService
      .post<EmailOtpCheckResponse>(
        BACKEND_URL + secureAPIURIs.emailOtpCheck.url,
        otpBody,
      )
      .toPromise();
  }
}
