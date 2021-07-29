import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { findRandomWordInfos } from '@/lib/wordInfo/service'

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const wordInfos = await findRandomWordInfos(3)
  res.json({
    items: wordInfos,
  })
})

export default handler
