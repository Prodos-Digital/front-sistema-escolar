"use client";

import { signIn, useSession, signOut } from "next-auth/react";

export function useAuthSession() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";

  return {
    session, // Dados da sessão
    status, // Status da sessão: 'authenticated', 'loading' ou 'unauthenticated'
    isAuthenticated, // Booleano para verificar se o usuário está autenticado
    signIn, // Método para autenticar o usuário
    signOut, // Método para encerrar a sessão
  };
}
