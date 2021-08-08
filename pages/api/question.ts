import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { findOrCreateActiveLessonForUser } from '@/modules/lesson/services/lessonService'
import { getSession } from 'next-auth/client'

const handler = nc<NextApiRequest, NextApiResponse>().put(async (req, res) => {
  const session = await getSession({ req })
  if (session?.user) {
    //const data = await updateQuestion(question, userId)
    //res.json(data)
    res.json('update')
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

export default handler
