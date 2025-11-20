"use client";

import Image from "next/image";
import DonorCard from "./Components/Card";
import { useAppSelector } from "@/lib/store/hooks";

export default function Home() {
  const { user, token } = useAppSelector((state) => state.auth);

  console.log("User object:", user);
  console.log("Token:", token);
  if (user) {
    console.log("User phoneNumber:", user.phoneNumber);
    console.log("All user properties:", Object.keys(user));
  } else {
    console.log("No user found");
  }
  return (
    <>
   <h1><DonorCard /> </h1>
    </>
  );
}