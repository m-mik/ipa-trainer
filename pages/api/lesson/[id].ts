import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import Joi from 'joi'
import { getSession } from 'next-auth/client'
import { updateLesson } from '@/modules/lesson/services/lessonService'
import errorHandler from '@/common/middlewares/errorHandler'
import { requireAuth } from '@/common/middlewares/requireAuth'
import validate from '@/common/middlewares/validation'
import { LessonStatus } from '@prisma/client'

const updateLessonSchema = Joi.object({
  status: LessonStatus.COMPLETED,
}).required()

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).patch(
  requireAuth,
  validate({ body: updateLessonSchema }),
  async (req, res) => {
    const session = (await getSession({ req })) as Session
    const lessonId = req.query.id as string
    const userId = session.user.id
    const data = req.body
    const { count } = await updateLesson({ lessonId, userId, data })
    if (!count) {
      res.status(400).json({ error: 'Incorrect lesson id' })
    } else {
      res.json(data)
    }
  }
)

export default handler
