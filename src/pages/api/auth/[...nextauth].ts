import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {cloneDeep} from "tailwindcss/lib/util/cloneDeep";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            if (!token['username']) {
                const username = (session?.user.name?.toLowerCase().replace(/\s/g, "") || session?.user.email?.split("@")[0] || "user") + "-" + Math.floor(Math.random() * 10000).toString()
                token['username'] = username
            }
            if (!session.user.id && token['sub']) {
                session.user.id = token['sub']
            }
            // @ts-ignore
            session.user = {...session.user, username: token['username']}
            return session
        }
    }
})