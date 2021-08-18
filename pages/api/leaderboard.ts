import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import errorHandler from '@/common/middlewares/errorHandler'
import { findUsersWithPoints } from '@/modules/leaderboard/services/leaderboardService'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).get(async (req, res) => {
  const page = Math.max(1, Number(req.query.page))
  const usersWithPoints = await findUsersWithPoints(page)
  const nextPageUsersWithPoints = await findUsersWithPoints(page + 1)
  res.json({
    users: usersWithPoints,
    hasMore: !!nextPageUsersWithPoints.length,
  })
})

export default handler
