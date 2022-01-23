export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}

export interface CreateSingleProductOrderData {
  addressId: string;
  priceId: string;
  productId: string;
  quantity: number;
}

export interface CreateSingleProductOrderResponse {
  message: string;
  valid: boolean;
  dialog?: DialogData;
  error?: ErrorData;
  data?: CreateSingleProductOrderResponseData;
}

export interface CreateSingleProductOrderResponseData {
  order_id: string;
}

export interface GetOrderPrefillsResponseData {
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  customer_id: string;
  prefill: PrefillData;
  notes: any;
}

export interface PrefillData {
  name: string;
  email?: string;
  contact?: string;
}

export interface GetOrderPrefillsResponse {
  message: string;
  valid: boolean;
  dialog?: DialogData;
  error?: ErrorData;
  data?: GetOrderPrefillsResponseData;
}

export interface PaymentDoneData {
  rp_payment_id: string;
  rp_order_id: string;
  rp_signature: string;
}

export interface PaymentDoneResponse {
  message: string;
  valid: boolean;
  dialog?: DialogData;
  error?: ErrorData;
}

export interface CancelOrderResponse {
  message: string;
  valid: boolean;
  dialog?: DialogData;
  error?: ErrorData;
}
