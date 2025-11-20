"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/lib/store/auth/authSlice";
import { AppDispatch } from "@/lib/store/store";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Restore token
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token) {
      dispatch(setToken(token));
    }

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        dispatch(setUser(parsedUser));
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}
