import NextAuth from 'next-auth'
import authConfig from './configs/auth.config';
import type { DefaultSession } from 'next-auth'
import { User } from '@prisma/client';


export const {
    handlers: { GET, POST },
    auth,
    unstable_update,
} = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
});


declare module 'next-auth' {
    interface Session {
        user: User & Omit<DefaultSession['user'], 'id'>;
    }
}