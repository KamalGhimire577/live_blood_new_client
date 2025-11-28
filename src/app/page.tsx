"use client";

import Image from "next/image";
import DonorCard from "./Components/Card";
import { useAppSelector } from "@/lib/store/hooks";

export default function Home() {
  
return (
    <>
   <h1><DonorCard /> </h1>
    </>
  );
}