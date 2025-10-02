import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Session } from "next-auth"; 

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
    accessTokenExpires: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access: string;
    refresh: string;
    accessTokenExpires: number;
  }
}

export interface ProfileProps {
  session: Session | null; // 👈 aquí debe ser Session | null
  name?: string;
}