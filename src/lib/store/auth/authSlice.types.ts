import { Status } from "@/lib/types/type";

export interface IUserData {
  id: string;
  email: string;
  phoneNumber: string;
  password: string;
  userName: string;
  role: string;
}

export interface IInitialState {
  user: IUserData;
  token: string | null;
  status: Status;
  errorMessage: string;
}

export interface ILoginData {
  phoneNumber: string;
  password: string;
  userName?: string;
}

export interface IRegisterData {
  userName: string;
  phoneNumber: string;
  password: string;
  email?: string;
}

/* ---- Initial state ---- */
const initialState: IInitialState = {
  user: {
    id: "",
    email: "",
    phoneNumber: "",
    password: "",
    userName: "",
    role: "",
  },
  token: null,
  status: Status.IDLE,
  errorMessage: "",
};

/* ---- Response shapes ---- */
interface LoginResponse {
  message: string;
  data: {
    id: string;
    email: string;
    phoneNumber: string;
    userName: string;
    password: string;
    token: string;
    role: string;
  };
}
