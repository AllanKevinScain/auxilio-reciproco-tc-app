"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

export function NextAuthProvider(props: SessionProviderProps) {
  const { session, children } = props;
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
