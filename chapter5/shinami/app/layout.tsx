import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import "./globals.css";
import "@mysten/dapp-kit/dist/index.css";

export const metadata: Metadata = {
  title: "Gas Station Demo",
  description: "Sui Gas Station with wallet connection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
