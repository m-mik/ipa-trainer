import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: process.env.DEMO_USERNAME,
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: process.env.DEMO_PASSWORD,
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials
        if (
          username === process.env.DEMO_USERNAME &&
          password === process.env.DEMO_PASSWORD
        ) {
          return { id: 1, name: 'John Smith', email: 'jsmith@example.com' }
        }
        return null
      },
    }),
  ],
  theme: 'dark',
  pages: {
    signIn: '/auth/sign-in',
  },
  //database: process.env.DATABASE_URL,
})
