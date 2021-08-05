import NextAuth, { Profile, Session, User as NextAuthUser } from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/common/db'
import { Credentials } from '@/modules/auth/types/Credentials'
import { findDemoUser } from '@/modules/auth/authService'
import { calculateUserPoints } from '@/services/userService'

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
        const { username, password } = credentials
        if (
          username === process.env.DEMO_USERNAME &&
          password === process.env.DEMO_PASSWORD
        ) {
          const user = await findDemoUser()
          if (user) {
            return { id: user.id, name: user.name, image: null }
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  callbacks: {
    async session(session, user) {
      const { id, name, image } = session.user

      return {
        ...session,
        user: {
          id,
          name,
          image,
          points: user.points,
        },
      } as Session
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        try {
          token.points = await calculateUserPoints(user.id)
        } catch (e) {
          console.error('Could not calculate user points in JWT', e)
          token.points = 0
        }
      }
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { jwt: true },
})
