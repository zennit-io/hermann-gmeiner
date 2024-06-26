import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/kycu",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/menaxhimi");
      if (isOnDashboard) return isLoggedIn;
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
