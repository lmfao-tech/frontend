import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter";
// @ts-ignore
import {cloneDeep} from "tailwindcss/lib/util/cloneDeep";

export default NextAuth({

    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_API_KEY!,
            clientSecret: process.env.TWITTER_API_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (profile) {
                token['userProfile'] = {
                    followersCount: profile.followers_count,
                    twitterHandle: profile.screen_name,
                    userID: profile.id,
                    followingCount: profile.friends_count,
                    postCount: profile.statuses_count
                };
            }
            if (account) {
                token['credentials'] = {
                    authToken: account.oauth_token,
                    authSecret: account.oauth_token_secret,
                }
            }
            return token
        },
        async session({ session, token, user }) {
            let userData = cloneDeep(token.userProfile);
            let credentials = cloneDeep(token.credentials);
            session.twitter = userData;
            session.tokens = credentials; 
            return session;
        }
    }
})