import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IInitialState,
  ILoginData,
  IRegisterData,
  IUserData,
  IAdminLoginData,
} from "./authSlice.types";
import { Status } from "@/lib/types/type";
import API from "@/lib/http/api";
import { AppDispatch } from "../store";


const initialState: IInitialState = {
  user: {
    id:"",
    email: "",
    phoneNumber: "",
    password: "",
    userName: "",
    role: "",
  },
  token: null,
  status: Status.IDLE,
};
interface LoginResponse {
  message: string;
  data: {
    id: string;
    email: string;
    phoneNumber: string;
    userName: string;
    password: "";
    token: string;
    role:string
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  Set user
    setUser(state, action: PayloadAction<IUserData>) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // keep synced
    },

    // Set status
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    //  Set token + persist/remove in localStorage
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },

    //  Logout clears all
    logout(state) {
      state.user = { id:"", phoneNumber: "", password:"", userName: ""  ,email:"",role:""};
      state.token = null;
      state.status = Status.IDLE;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setStatus, setToken, logout } = authSlice.actions;
export default authSlice.reducer;

// Reset status action
export function resetAuthStatus() {
  return function resetAuthStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.IDLE));
  };
}
// Registration Thunk
export function registerUser(data: IRegisterData) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.post("auth/signup", data);

      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Signup error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// ✅ User Login Thunk
export function loginUser(data: ILoginData) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.post<LoginResponse>("auth/signin", data);
      
      if (response.status === 200 && response.data) {
        const { token, ...userData } = response.data.data;
        dispatch(setUser({ ...userData }));
        dispatch(setToken(token));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("User login error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// ✅ Admin Login Thunk
export function loginAdmin(data: IAdminLoginData) {
  return async function loginAdminThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.post<LoginResponse>("auth/admin/signin", data);
      
      if (response.status === 200 && response.data) {
        const { token, ...userData } = response.data.data;
        dispatch(setUser({ ...userData }));
        dispatch(setToken(token));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Admin login error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export const initializeAuth = (dispatch: AppDispatch) => {
  if (typeof window === "undefined") return; // avoid SSR crash

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token) dispatch(setToken(token));
  if (user) dispatch(setUser(JSON.parse(user)));
};