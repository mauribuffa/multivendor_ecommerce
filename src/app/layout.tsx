import type { Metadata } from "next";
import {  Barlow } from "next/font/google";
import "./globals.css";
const barlowFont = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "GoShop",
  description: "GoShop is a multi-vendor e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlowFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
