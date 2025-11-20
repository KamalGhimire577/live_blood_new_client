"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackButton from "./BackButton";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayoutRoutes = ["/auth/admin/signin", "/auth/donorsignup", "/auth/signin", "/auth/signup"];
  const hideLayout = hideLayoutRoutes.includes(pathname) || /^\/bloodrequest\/[^/]+$/.test(pathname);

  return (
    <>
      {hideLayout && <BackButton />}
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}