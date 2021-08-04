import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { findRandomWords } from '@/modules/word/service'

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const words = await findRandomWords(3)
  res.json({
    items: words,
  })
})

export default handler
