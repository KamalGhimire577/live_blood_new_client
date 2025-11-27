"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { Status } from "@/lib/types/type";
import BloodLoader from "./BloodLoader";

export default function GlobalLoader() {
  const authStatus = useAppSelector((state) => state.auth.status);
  const donorAuthStatus = useAppSelector((state) => state.donorauth.status);
  const bloodRequestStatus = useAppSelector((state) => state.bloodrequest.status);
  const adminStatus = useAppSelector((state) => state.admin.status);

  // Only show loader for auth operations, not admin CRUD operations
  const isLoading = [authStatus, donorAuthStatus, bloodRequestStatus].includes(Status.LOADING);

  if (!isLoading) return null;

  return <BloodLoader fullScreen={true} />;
}