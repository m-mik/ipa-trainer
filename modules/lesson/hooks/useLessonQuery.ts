import { useQuery } from 'react-query'
import axios from 'axios'
import useLesson from './useLesson'
import { ActionType } from '../store/lessonActions'
import { Answer, Language, PartOfSpeech } from '@prisma/client'

export type QuestionWithPronunciations = {
  id: string
  answer: Answer
  word: {
    name: string
    partOfSpeech: PartOfSpeech
    pronunciations: [
      {
        id: string
        audio: string
        language: Language
        symbols?: string
      }
    ]
  }
}

export type LessonWithPronunciations = {
  questions: QuestionWithPronunciations[]
  error: never
}

export type LessonResponseError = {
  error: string
  questions: never
}

export type LessonResponseData = LessonWithPronunciations | LessonResponseError

function isLessonResponseError(
  data: LessonResponseData
): data is LessonResponseError {
  return typeof data.error !== 'undefined'
}

function useLessonQuery() {
  const {
    dispatch,
    state: { activeQuestion },
  } = useLesson()
  return useQuery(
    'lesson',
    () => axios.post<LessonResponseData>('/api/lesson').then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        if (isLessonResponseError(data)) return

        const firstQuestionWithoutAnswer =
          data.questions.find(
            (question: QuestionWithPronunciations) =>
              question.answer === Answer.NONE
          ) ?? null

        dispatch({
          type: ActionType.SetActiveQuestion,
          question: firstQuestionWithoutAnswer,
        })
      },
    }
  )
}

export default useLessonQuery
