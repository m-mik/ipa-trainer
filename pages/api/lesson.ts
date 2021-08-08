import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { findOrCreateActiveLessonForUser } from '@/modules/lesson/services/lessonService'
import { getSession } from 'next-auth/client'

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const session = await getSession({ req })
  if (session?.user) {
    const lesson = await findOrCreateActiveLessonForUser(session.user.id)
    res.json(lesson)
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

export default handler
