export interface GetAddressesResponse {
  message: string;
  valid: boolean;
  data?: Data;
  error?: ErrorData;
  dialog?: DialogData;
}

export interface Data {
  count: number;
  rows: Row[];
}

export interface Row {
  id: string;
  name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zipcode: string;
  contact_no: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}
