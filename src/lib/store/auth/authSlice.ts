// lib/store/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "@/lib/http/api";
import { AppDispatch } from "../store";
import { Status } from "@/lib/types/type";
import { IUserData, IInitialState, IRegisterData, ILoginData } from "./authSlice.types";

/* ---- Types ---- */
interface LoginResponse {
  message: string;
  data: {
    id: string;
    email: string;
    phoneNumber: string;
    userName: string;
    password: "";
    token: string;
    role: string;
  };
}

interface IAdminLoginData {
  email: string;
  password: string;
}

/* ---- Initial State ---- */
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

/* ---- Slice ---- */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserData>) {
      state.user = action.payload;
      // persist user
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },

    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (typeof window === "undefined") return;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },

    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },

    logout(state) {
      state.user = {
        id: "",
        email: "",
        phoneNumber: "",
        password: "",
        userName: "",
        role: "",
      };
      state.token = null;
      state.status = Status.IDLE;
      state.errorMessage = "";
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, setStatus, setToken, logout, setErrorMessage } =
  authSlice.actions;
export default authSlice.reducer;

/* ---- Helpers / Thunks ---- */

// Reset status action
export function resetAuthStatus() {
  return function resetAuthStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.IDLE));
    dispatch(setErrorMessage(""));
  };
}

// Initialize auth from localStorage (call once at app start)
export const initializeAuth = (dispatch: AppDispatch) => {
  if (typeof window === "undefined") return; // SSR safe
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token) dispatch(setToken(token));
  if (user) dispatch(setUser(JSON.parse(user)));
};

/* ---- Registration Thunk (unchanged logic) ---- */
export function registerUser(data: IRegisterData) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      dispatch(setErrorMessage(""));
      const response = await API.post("auth/signup", data);

      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      const msg = error?.response?.data?.message || "Signup failed";
      dispatch(setErrorMessage(msg));
      dispatch(setStatus(Status.ERROR));
    }
  };
}

/* ---- User Login Thunk ---- */
export function loginUser(data: ILoginData) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      dispatch(setErrorMessage(""));

      const response = await API.post<LoginResponse>("auth/signin", data);

      if (response.status === 200 && response.data) {
        const { token, ...userData } = response.data.data;
        dispatch(setUser({ ...userData } as IUserData));
        dispatch(setToken(token));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        const msg = response?.data?.message || "Login failed";
        dispatch(setErrorMessage(msg));
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error("User login error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid phone number or password";

      dispatch(setErrorMessage(message));
      dispatch(setStatus(Status.ERROR));
    }
  };
}

/* ---- Admin Login Thunk (email-based) ---- */
export function loginAdmin(data: IAdminLoginData) {
  return async function loginAdminThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      dispatch(setErrorMessage(""));

      const response = await API.post<LoginResponse>("auth/admin/signin", data);

      if (response.status === 200 && response.data) {
        const { token, ...userData } = response.data.data;
        dispatch(setUser({ ...userData } as IUserData));
        dispatch(setToken(token));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        const msg = response?.data?.message || "Admin login failed";
        dispatch(setErrorMessage(msg));
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error("Admin login error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid email or password";
      dispatch(setErrorMessage(message));
      dispatch(setStatus(Status.ERROR));
    }
  };
}
