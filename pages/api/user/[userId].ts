import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'
import errorHandler from '@/common/middlewares/errorHandler'
import { findUserById } from '@/common/services/userService'
import validate from '@/common/middlewares/validation'

const getUserSchema = {
  query: Joi.object({
    userId: Joi.string().required(),
  }).required(),
}

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).get(validate(getUserSchema), async (req, res) => {
  const userId = String(req.query.userId)
  const user = await findUserById(userId)
  if (!user) {
    return res.status(404).json({ message: 'User does not exist', code: 404 })
  }
  res.json(user)
})

export default handler
