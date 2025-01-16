import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
const barlowFont = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "700"],
});
import { ThemeProvider } from "next-themes";
import {
  ClerkProvider
} from '@clerk/nextjs'

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${barlowFont.variable} antialiased`}>
          <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange

        >
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
