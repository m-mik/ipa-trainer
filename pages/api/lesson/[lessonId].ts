import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import Joi from 'joi'
import { getSession } from 'next-auth/client'
import { updateLesson } from '@/modules/lesson/lessonService'
import errorHandler from '@/middlewares/errorHandler'
import { requireAuth } from '@/middlewares/requireAuth'
import validate from '@/middlewares/validation'
import { LessonStatus } from '@prisma/client'

const updateLessonSchema = {
  query: Joi.object({
    lessonId: Joi.string().required(),
  }).required(),
  body: Joi.object({
    status: Joi.string().valid(LessonStatus.COMPLETED).required(),
  }).required(),
}

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).patch(requireAuth, validate(updateLessonSchema), async (req, res) => {
  const session = (await getSession({ req })) as Session
  const lessonId = req.query.lessonId as string
  const userId = session.user.id
  const data = req.body
  const { count } = await updateLesson({ lessonId, userId, data })
  if (!count) {
    res.status(400).json({ message: 'Incorrect lesson id', code: 400 })
  } else {
    res.json(data)
  }
})

export default handler
