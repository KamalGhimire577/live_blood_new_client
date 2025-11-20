


import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/store/provider";
import AppInitializer from "../app/Components/AppInitializer";
import LayoutWrapper from "./Components/LayoutWrapper";
import GlobalLoader from "./Components/GlobalLoader";
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "My Live Blood App",
  description: "Blood donation management system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <ReduxProvider>
          <AppInitializer>
            <LayoutWrapper>{children}</LayoutWrapper>
            <GlobalLoader />
          </AppInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
