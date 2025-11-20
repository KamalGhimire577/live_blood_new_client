"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/store/auth/authSlice";
import { AppDispatch } from "@/lib/store/store";
import { useRouter } from "next/navigation";

export default function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout()); // clear user + token from Redux and localStorage
    router.push("/auth/signin"); // redirect to login page
  }, [dispatch, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Logging out...</p>
    </div>
  );
}
