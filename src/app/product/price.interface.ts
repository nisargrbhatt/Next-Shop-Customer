export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}

export interface GetPriceResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: PriceData;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  contact_no?: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface PriceData {
  id: string;
  price: number;
  stock: number;
  productId: string;
  merchantId: string;
  user?: UserData;
}
