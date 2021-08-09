import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { findOrCreateActiveLessonForUser } from '@/modules/lesson/services/lessonService'
import { getSession } from 'next-auth/client'
import { errorHandler } from '@/common/middlewares/errorHandler'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).post(async (req, res) => {
  const session = await getSession({ req })
  if (session?.user) {
    const lesson = await findOrCreateActiveLessonForUser(session.user.id)
    res.json(lesson)
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

export default handler
