import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Session, getServerSession } from "next-auth";
import { NextAuthProvider } from "@/providers";
import { cn } from "@/lib/utils";
import { authOptions } from "@/lib/next-auth";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Login Azure",
  description: "Teste de Allan",
};

interface SomeChildInterface {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: SomeChildInterface) {
  let session = {} as Session;
  const getSession = await getServerSession(authOptions);
  if (getSession !== null) {
    session = getSession;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen font-sans antialiased bg-slate-100",
          fontSans.variable
        )}
      >
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
