import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { findOrCreateActiveLessonForUser } from '@/modules/lesson/services/lessonService'
import { getSession } from 'next-auth/client'
import errorHandler from '@/common/middlewares/errorHandler'
import { requireAuth } from '@/common/middlewares/requireAuth'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).post(requireAuth, async (req, res) => {
  const session = await getSession({ req })
  const lesson = await findOrCreateActiveLessonForUser(session!.user.id)
  res.json(lesson)
})

export default handler
