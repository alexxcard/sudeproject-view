import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      access: string;
      refresh: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    access: string;
    refresh: string;
  }

  interface JWT {
    access: string;
    refresh: string;
    accessTokenExpires: number;
  }
}