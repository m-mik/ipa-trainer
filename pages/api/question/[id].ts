import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import Joi from 'joi'
import { answerQuestion } from '@/modules/lesson/services/lessonService'
import validate from '@/middlewares/validation'
import errorHandler from '@/common/middlewares/errorHandler'
import { Language } from '@prisma/client'
import { requireAuth } from '@/common/middlewares/requireAuth'
import { Session } from 'next-auth'

const saveQuestionSchema = Joi.object({
  symbols: Joi.string().required(),
  language: Joi.string().valid(...Object.values(Language)),
})

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).patch(
  requireAuth,
  validate({ body: saveQuestionSchema }),
  async (req, res) => {
    const session = (await getSession({ req })) as Session
    const questionId = req.query.id as string
    const userId = session.user.id
    const { symbols, language } = req.body

    const result = await answerQuestion({
      questionId,
      userId,
      symbols,
      language,
    })
    res.json(result)
  }
)

export default handler
