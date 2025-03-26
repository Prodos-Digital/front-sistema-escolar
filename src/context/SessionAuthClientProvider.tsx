"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionAuthClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
}
