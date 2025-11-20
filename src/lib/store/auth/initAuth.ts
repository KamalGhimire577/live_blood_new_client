// lib/store/auth/initAuth.ts
import { setUser, setToken } from "./authSlice";
import { AppDispatch } from "../store";

export const initializeAuth = (dispatch: AppDispatch) => {
  if (typeof window === "undefined") return; // SSR safety

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token) dispatch(setToken(token));
  if (user) dispatch(setUser(JSON.parse(user)));
};
