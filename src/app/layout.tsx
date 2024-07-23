import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Session, getServerSession } from "next-auth";
import { LoadingProvider, NextAuthProvider } from "@/providers";
import { cn } from "@/lib/utils";
import { authOptions } from "@/lib/next-auth";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Auxílio TC",
    default: "Login",
  },
  description: "Login Page",
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
        <LoadingProvider>
          <NextAuthProvider session={session}>
            <main className="h-screen">{children}</main>
          </NextAuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
