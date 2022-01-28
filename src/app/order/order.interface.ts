export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}

export interface GetAllOrdersByUserIdResponseData {
  count: number;
  rows: GetAllOrdersByUserIdResponseDataRows[];
}

export interface GetAllOrdersByUserIdResponse {
  message: string;
  valid: boolean;
  dialog?: DialogData;
  error?: ErrorData;
  data?: GetAllOrdersByUserIdResponseData;
}

export interface GetAllOrdersByUserIdResponseDataRows {
  id: string;
  rp_order_id: string;
  rp_customer_id: string;
  order_status: boolean;
  quantity: number;
  rp_prefill_data: string;
  order_decision_status?: boolean;
  order_decision?: boolean;
  delivery_status?: boolean;
  order_cancel?: boolean;
  refund_status?: boolean;
  rp_refund_id?: string;
  amount: number;
  userId: string;
  addressId: string;
  productId: string;
  priceId: string;
  merchantId: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
  merchant: Merchant;
}

export interface Merchant {
  id: string;
  email: string;
  name: string;
  contact_no: null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  small_description: string;
  specification: string;
  slug: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
}

export interface Image {
  id: string;
  name: string;
  url: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}
