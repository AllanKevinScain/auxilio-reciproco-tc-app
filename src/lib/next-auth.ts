import { AuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProviders from "next-auth/providers/credentials";
import { Account, AuthData } from "@/types";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProviders({
      name: "credentials-sign-in",
      credentials: {
        email: {
          label: "Email",
          placeholder: "Insira seu email",
          type: "email",
          value: "meuemail44allan@gmail.com",
        },
        password: {
          label: "Senha",
          type: "password",
          placeholder: "Insira sua senha",
          value: "Lulu221101$",
        },
      },
      async authorize(credentials, _) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const user = {
          id: "idaleatorio-987dsndy432d7",
          email: credentials.email,
        };

        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      checks: ["none"],
    }),
  ],
  pages: {
    signIn: "/",
    error: "/error",
  },
  callbacks: {
    async signIn(data) {
      const authData = data as AuthData;
      let accessTruth = false;

      if (data.account) {
        const account = data.account as Account;
        if (account.provider === "credentials") {
          if (
            authData.credentials?.email === "meuemail44allan@gmail.com" &&
            authData.credentials.password === "123456"
          ) {
            accessTruth = true;
          }
        } else {
          if (authData.user.email === "meuemail44allan@gmail.com") {
            accessTruth = true;
          }
        }
      }

      if (!accessTruth) {
        localStorage.clear();
        sessionStorage.clear();
      }

      return accessTruth;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
};
