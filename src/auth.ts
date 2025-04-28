import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always redirect to the dashboard after login
      return `${baseUrl}/dashboard`;
    },
  },
  ...authConfig,
});
