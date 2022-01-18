export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}

export interface GetAllCategoriesWithFiveProductsResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: GetAllCategoriesWithFiveProductsResponseData;
}

export interface GetAllCategoriesWithFiveProductsResponseData {
  count: number;
  rows: CategoryData[];
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
  category?: CategoryData;
}

export interface CategoryData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
}

export interface Image {
  id: string;
  name: string;
  url: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}
