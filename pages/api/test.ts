// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
const secret = process.env.NEXTAUTH_JWT_SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  console.log(session)
  const token = await jwt.getToken({ req, secret })
  if (token) {
    // Signed in
    console.log('JSON Web Token', JSON.stringify(token, null, 2))
    res.send({ session, token })
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
