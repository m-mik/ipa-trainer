import { useQuery } from 'react-query'
import axios from 'axios'
import useLesson from './useLesson'
import { ActionType } from '../store/lessonActions'
import { Answer } from '@prisma/client'
import {
  LessonResponseData,
  LessonResponseError,
  QuestionWithPronunciations,
} from '../types'

function isLessonResponseError(
  data: LessonResponseData
): data is LessonResponseError {
  return typeof data.error !== 'undefined'
}

function useLessonQuery() {
  const { dispatch } = useLesson()
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
