import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Adjust the path to your Prisma client

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Add your authentication providers here
    // Example: GitHub provider
    {
      id: "github",
      name: "GitHub",
      type: "oauth",
      version: "2.0",
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "read:user" },
      },
      token: "https://github.com/login/oauth/access_token",
      userinfo: "https://api.github.com/user",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    },
    // Add more providers (Google, Email, etc.) as needed
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // Add user ID to the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };