import { Answer } from '@prisma/client'

export function getAnswerCountByType(questions: Array<{ answer: Answer }>) {
  return questions.reduce(
    (result, question) => {
      let count = result[question.answer] ?? 0
      return { ...result, [question.answer]: ++count }
    },
    { CORRECT: 0, INCORRECT: 0, NONE: 0 }
  )
}
