import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import errorHandler from '@/common/middlewares/errorHandler'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
}).post(async (req, res) => {
  res.json({})
  //res.json(removeUnansweredQuestionSymbols(lesson))
})

export default handler
