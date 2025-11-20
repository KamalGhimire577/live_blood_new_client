import { Status } from "@/lib/types/type";

export interface IUserData {
  id: string;
  phoneNumber: string;
  password: string;
  userName: string;
  email: string;
  role:string;
  
}

export interface IInitialState {
  user: IUserData;
  token: string | null;
  status: Status;
}

export interface IRegisterData {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
export interface ILoginData {
  phoneNumber: string;
  password: string;
}
export interface IAdminLoginData {
  email: string;
  password: string;
}