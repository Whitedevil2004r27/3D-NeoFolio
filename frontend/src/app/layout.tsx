import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { MainProvider } from "@/components/MainProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developer Portfolio | Next-Gen 3D",
  description: "Generic interactive developer portfolio template powered by Next.js and Three.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <MainProvider>
          {children}
        </MainProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
