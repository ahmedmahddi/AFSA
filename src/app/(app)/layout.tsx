import { NuqsAdapter } from "nuqs/adapters/next/app";

import type { Metadata } from "next";
import { Inter, Playfair_Display, Pacifico, Caveat } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "AFSA",
  description: "AFSA Creative Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${pacifico.variable} ${caveat.variable} antialiased`}
      >
        <TRPCReactProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
