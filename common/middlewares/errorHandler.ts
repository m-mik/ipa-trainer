import { NextApiRequest, NextApiResponse } from 'next'

export default function errorHandler(
  err: Error,
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
}
