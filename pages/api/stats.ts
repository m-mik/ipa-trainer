import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import errorHandler from '@/middlewares/errorHandler'
import { getStats } from '@/modules/stats/statsService'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).get(async (req, res) => {
  const stats = await getStats()
  res.json(stats)
})

export default handler
