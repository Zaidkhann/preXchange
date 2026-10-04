import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar.jsx"
import Footer from "@/components/Footer.jsx"
import {ToastProvider} from "@heroui/react"
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "preXchange",
  description: "A marketplace for buying and selling pre-owned products",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col scroll-smooth">
        <Navbar/>
        {children}
        <Footer/>
        <ToastProvider />
        
      </body>
    </html>
  );
}