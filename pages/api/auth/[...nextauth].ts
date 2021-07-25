import NextAuth, { Profile, User as NextAuthUser } from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/prisma/db'

export type Credentials = { username: string; password: string }

interface NextAuthUserWithStringId extends NextAuthUser {
  id: string
}

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile: Profile & { id: string }) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        } as NextAuthUserWithStringId
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Credentials({
      name: 'Credentials',
      async authorize(credentials: Credentials, req: NextApiRequest) {
        console.log(process.env.DEMO_USERNAME)
        const { username, password } = credentials
        if (
          username === process.env.DEMO_USERNAME &&
          password === process.env.DEMO_PASSWORD
        ) {
          return { id: 21, name: 'John Smith', email: 'jsmith@example.com' }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  adapter: PrismaAdapter(prisma),
  database: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
})
