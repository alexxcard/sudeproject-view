import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials?.username,
        password: credentials?.password,
      }),
    });

    const user = await res.json();

    if (res.ok && user?.access) {
      return {
        id: "1", // 👈 obligatorio por el tipo User
        access: user.access,
        refresh: user.refresh,
        accessTokenExpires: Date.now() + 60 * 1000,
      };
    }

    return null;
  } catch (error) {
    console.error("Error en authorize:", error);
    return null;
  }
}
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hora
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      // 🔹 Primer login: guardar tokens en el JWT
      if (user) {
        return {
          ...token,
          access: user.access,
          refresh: user.refresh,
          accessTokenExpires: Date.now() + 60 * 1000, // 1 min
        };
      }

      // 🔹 Token aún válido
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // 🔹 Refrescar el token
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      // Guardamos access y refresh dentro de session.user
      session.user = {
        access: token.access,
        refresh: token.refresh,
      } as any;

      return session;
    },
  },
};

// -------------------- REFRESH TOKEN --------------------
async function refreshAccessToken(token: any) {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refresh }),
    });

    const refreshedTokens = await res.json();

    if (!res.ok) throw refreshedTokens;

    return {
      ...token,
      access: refreshedTokens.access,
      accessTokenExpires: Date.now() + 60 * 1000,
      refresh: token.refresh, // Django no devuelve refresh nuevo
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
