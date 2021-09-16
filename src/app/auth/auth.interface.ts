export interface UserData {
  token: string;
  expiresIn: number;
  role: string;
  access: string;
  emailVerified: boolean;
}

export interface errorData {
  code: string;
  message: string;
}

export interface dialogData {
  header: string;
  message: string;
}

export interface SignupResponseData{
  token: string;
  expiresIn: number;
  role: string;
  access: string;
  emailVerified: boolean;
  userId:string;
}
export interface SignupResponse{
  message:string;
  valid:boolean;
  error?:errorData;
  data?:SignupResponseData
}

export interface AuthData{
  token: string;
  expiresIn: number;
  role: string;
  access: string;
  emailVerified: boolean;
  userId:string;
}