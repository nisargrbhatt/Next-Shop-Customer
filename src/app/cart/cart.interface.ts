export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}

// Complete with Response
export interface Cart {
  id: string;
  quantity: number;
  priceId: string;
}

export interface GetCartResponseData {
  count: number;
  rows: any[];
}

export interface GetCartResponse {
  message: string;
  valid: boolean;
  data?: GetCartResponseData;
  error?: ErrorData;
  dialog?: DialogData;
}

export interface UpdateQuantityCartData {
  quantity: number;
  cartId: string;
}

export interface UpdateQuantityCartResponse {
  message: string;
  valid: boolean;
  data?: GetCartResponseData;
  error?: ErrorData;
}

export interface AddToCartData {
  quantity: number;
  priceId: string;
  productId: string;
}

export interface AddToCartResponse {
  message: string;
  valid: boolean;
  data?: GetCartResponseData;
  error?: ErrorData;
}

export interface DeleteTheItemResponse {
  message: string;
  valid: boolean;
  data?: GetCartResponseData;
  error?: ErrorData;
}
