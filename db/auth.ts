import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
//
import type { User as UserType } from "@/types/User";
import { SignInSchema } from "./schemas/sign-in-schema";
//
import { sql } from "drizzle-orm";
import db from "@/db/drizzle";
import { User } from "./schema";
//
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<UserType | undefined> {
  try {
    const user = await db.select().from(User).where(sql` ${User.email} =
    ${email} `);
    return user[0];
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = SignInSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 60, // 60 days
  },
});
