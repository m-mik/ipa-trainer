import NextAuth, { Profile, Session, User as NextAuthUser } from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/common/db'
import { Credentials } from '@/modules/auth/types/Credentials'
import { loginDemoUser } from '@/modules/auth/authService'
import { calculateUserPoints } from '@/common/services/userService'

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
        const user = (await loginDemoUser(credentials)) as NextAuthUser
        return user ?? null
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
          id: user.uid,
          points: user.points,
          name,
          image,
        },
      } as Session
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (token.uid) {
        try {
          token.points = await calculateUserPoints(token.uid as string)
        } catch (e) {
          console.error('Could not calculate user points in JWT', e)
          token.points = 0
        }
      }

      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { jwt: true },
})
