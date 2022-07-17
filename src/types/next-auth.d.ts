import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            name: string;
            email: string;
            image: string;
        }
        expires: string;
        twitter: {
            followersCount: number;
            twitterHandle: string;
            userID: number;
            followingCount: number;
            postCount: number;
        }
        tokens: {
            authToken: string;
            authSecret: string;
        }
    }
}