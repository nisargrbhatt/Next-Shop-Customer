export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}

export interface AddReviewData {
  message?: string;
  stars: number;
  productId: string;
}

export interface AddReviewResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
}

export interface UpdateReviewData {
  message?: string;
  stars: number;
  reviewId: string;
}

export interface UpdateReviewResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
}
