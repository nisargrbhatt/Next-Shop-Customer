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
  rows: CartData[];
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

export interface CartData {
  id: string;
  quantity: number;
  priceId: string;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  price: Price;
  product: Product;
}

export interface Price {
  id: string;
  price: number;
  stock: number;
  merchantId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  contact_no?: string;
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
  decline_count: number;
  decline_reason: string;
  approval_status: boolean;
  productApproved: boolean;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: Image[];
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: string;
  name: string;
  url: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}
