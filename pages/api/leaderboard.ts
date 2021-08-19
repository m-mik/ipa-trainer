import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import errorHandler from '@/common/middlewares/errorHandler'
import { findUsers } from '@/common/services/userService'
import validate from '@/common/middlewares/validation'
import Joi from 'joi'

const getLeaderboard = {
  query: Joi.object({
    page: Joi.number().required(),
  }).required(),
}

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).get(validate(getLeaderboard), async (req, res) => {
  const page = Math.max(1, Number(req.query.page))
  const usersWithPoints = await findUsers(page)
  const nextPageUsersWithPoints = await findUsers(page + 1)
  res.json({
    users: usersWithPoints,
    hasMore: !!nextPageUsersWithPoints.length,
  })
})

export default handler
