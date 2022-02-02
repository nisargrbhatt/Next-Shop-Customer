import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AddReviewData,
  AddReviewResponse,
  UpdateReviewData,
  UpdateReviewResponse,
} from './review.interface';

import {
  environment,
  secureAPIURIs,
  basicAPIURIs,
} from 'src/environments/environment';

const BACKEND_URL = environment.production
  ? environment.backend_url_secure
  : environment.backend_url;

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private httpService: HttpClient) {}

  addReview(addReviewData: AddReviewData): Observable<AddReviewResponse> {
    return this.httpService.post<AddReviewResponse>(
      BACKEND_URL + secureAPIURIs.addReview.url,
      addReviewData,
    );
  }

  updateReview(
    updateReviewData: UpdateReviewData,
  ): Observable<UpdateReviewResponse> {
    return this.httpService.put<UpdateReviewResponse>(
      BACKEND_URL + secureAPIURIs.updateReview.url,
      updateReviewData,
    );
  }
}
