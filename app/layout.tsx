import React from "react";
import type { Metadata } from "next";
import { Inter, Fira_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const GeistSans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const GeistMono = Fira_Mono({
  subsets: ["latin"], variable: "--font-mono",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Shelfwise",
  description: "Created with Pranav",
  generator: "v0.app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
  lang="en"
  suppressHydrationWarning
  className={`${GeistSans.variable} ${GeistMono.variable}`}
>
  <body className="font-sans bg-background text-foreground flex min-h-screen">
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="flex-1 p-6">{children}</main>
    </ThemeProvider>
  </body>
</html>

  );
}
