import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: User;
    token: string;
    refresh_token: string;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    first_name: string;
    date_of_birth: string;
    avatar: string;
    token: string;
    refresh_token: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Credenciais inválidas");
        }

        const { email, password } = credentials;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/`,
          {
            method: "POST",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.first_name = user.first_name;
        token.date_of_birth = user.date_of_birth;
        token.avatar = user.avatar;
        token.token = user.token;
        token.refresh_token = user.refresh_token;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.first_name = token.first_name as string;
      session.user.date_of_birth = token.date_of_birth as string;
      session.user.avatar = token.avatar as string;
      session.token = token.token as string;
      session.refresh_token = token.refresh_token as string;

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 5,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
