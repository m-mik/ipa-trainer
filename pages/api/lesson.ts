import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import Joi from 'joi'
import {
  findLessonsForUser,
  findOrCreateActiveLessonForUser,
} from '@/modules/lesson/lessonService'
import errorHandler from '@/common/middlewares/errorHandler'
import { requireAuth } from '@/common/middlewares/requireAuth'
import { removeUnansweredQuestionSymbols } from '@/modules/lesson/utils'
import { LessonWithPronunciations } from '@/modules/lesson/types'
import validate from '@/common/middlewares/validation'

const getLessonsSchema = {
  query: Joi.object({
    userId: Joi.string().required(),
    page: Joi.number().required(),
  }).required(),
}

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
})
  .get(validate(getLessonsSchema), async (req, res) => {
    const userId = String(req.query.userId)
    const page = Math.max(1, Number(req.query.page))
    const lessons = await findLessonsForUser(userId, page)
    const nextPageLessons = await findLessonsForUser(userId, page + 1)
    res.json({
      next: nextPageLessons.length ? page + 1 : false,
      data: lessons,
    })
  })
  .post(requireAuth, async (req, res) => {
    const session = await getSession({ req })
    const lesson = (await findOrCreateActiveLessonForUser(
      session!.user.id
    )) as LessonWithPronunciations
    res.json(removeUnansweredQuestionSymbols(lesson))
  })

export default handler
