import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// Prisma adapter for NextAuth, optional and can be removed
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export default NextAuth({
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
      version: '2.0' 
    }),
    // ...add more providers here
  ],
});
