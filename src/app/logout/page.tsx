"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/store/auth/authSlice";
import { AppDispatch, RootState } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import BloodLoader from "../Components/BloodLoader";

export default function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const isAdmin = user?.role === "admin";
    dispatch(logout());
    
    if (isAdmin) {
      router.push("/auth/admin/signin");
    } else {
      router.push("/auth/signin");
    }
  }, [dispatch, router, user?.role]);

  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <BloodLoader />
      <p className="text-lg font-semibold text-red-500">Logging out...</p>
    </div>
    </>
  );
}
