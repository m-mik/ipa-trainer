import { Answer } from '@prisma/client'
import { LessonWithPronunciations } from './types'

export function getAnswerCountByType(questions: Array<{ answer: Answer }>) {
  return questions.reduce(
    (result, question) => {
      let count = result[question.answer] ?? 0
      return { ...result, [question.answer]: ++count }
    },
    { CORRECT: 0, INCORRECT: 0, NONE: 0 }
  )
}

export function removeUnansweredQuestionSymbols(
  lesson: LessonWithPronunciations
) {
  return {
    ...lesson,
    questions: lesson.questions.map((question) => ({
      ...question,
      word: {
        ...question.word,
        pronunciations: question.word.pronunciations.map((pronunciation) => {
          if (question.answer === Answer.NONE) {
            const { symbols, ...rest } = pronunciation
            return rest
          } else return pronunciation
        }),
      },
    })),
  }
}
