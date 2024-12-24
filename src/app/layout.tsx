import type { Metadata } from "next";
import "./globals.css";

import AppContextProvider from "@/context/context-provider";

export const metadata: Metadata = {
  title: "iMessage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-regular tracking-wide">
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
