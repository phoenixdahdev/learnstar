import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig, } from "next-auth"
import { inDevEnvironment } from "@/utils"
import { loginSchema } from "@/schema"
import { login } from '@/actions/auth';

const authConfig: NextAuthConfig = {
    providers: [
        Google({
            checks: ['none'],
        }),
        Credentials({
            // TODO: fix type mismatch
            // @ts-expect-error next line
            async authorize(credentials) {
                const validdata = loginSchema.safeParse(credentials)
                if (!validdata.success) {
                    return
                }
                const res = await login(validdata.data)
                if (!res.success) {
                    return
                }
                const user = res.user
                if (!user) {
                    return
                }
                return {
                    ...user,
                    email: user.email,
                    id: user.id.toString(),
                    name: user.name,
                }
            }
        }),
    ],
    basePath: '/api/auth',
    session: {
        strategy: 'jwt',
    },
    debug: inDevEnvironment,
    trustHost: true,
    callbacks: {
        async signIn({ account, profile, user }) {
            if (account?.provider === 'google' && profile?.email) {
                return true
            }
            return !!user
        },
        async jwt({ token, user, }) {
            return { ...token, ...user };
            // if (account && account.provider === "credentials") {
            // }
        },
        async session({ session, token }) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            session.user = token as any;
            return session;
        },

    }

} satisfies NextAuthConfig;

export default authConfig