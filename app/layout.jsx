"use client";

import Header from "./components/Header/page";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Header />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
