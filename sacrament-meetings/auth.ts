import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const email = process.env.BISHOPRIC_EMAIL;
        const passwordHash = process.env.BISHOPRIC_PASSWORD_HASH;
        if (!email || !passwordHash) {
          console.error("Bishopric login environment variables are not configured.");
          return null;
        }

        if (parsed.data.email.toLowerCase() !== email.toLowerCase()) return null;

        const passwordMatches = await bcrypt.compare(parsed.data.password, passwordHash);
        if (!passwordMatches) return null;

        return { id: "bishopric-admin", name: "Bishopric Administrator", email };
      },
    }),
  ],
});
