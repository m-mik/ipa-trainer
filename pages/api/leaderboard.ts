import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'
import errorHandler from '@/middlewares/errorHandler'
import validate from '@/middlewares/validation'
import { findUsers } from '@/modules/leaderboard/leaderboardService'

const getLeaderboardSchema = {
  query: Joi.object({
    page: Joi.number().required(),
  }).required(),
}

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).get(validate(getLeaderboardSchema), async (req, res) => {
  const page = Math.max(1, Number(req.query.page))
  const users = await findUsers(page)
  const nextPageUsers = await findUsers(page + 1)
  res.json({
    users: users,
    hasMore: !!nextPageUsers.length,
  })
})

export default handler
