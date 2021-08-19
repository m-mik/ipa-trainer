import { LessonStatus } from '@prisma/client'
import { QuestionWithPronunciations } from './QuestionWithPronunciations'

export type LessonWithPronunciations = {
  id: string
  questions: QuestionWithPronunciations[]
  status: LessonStatus
}
