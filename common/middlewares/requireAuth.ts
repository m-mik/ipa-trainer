import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export async function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) {
  const session = await getSession({ req })
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}
