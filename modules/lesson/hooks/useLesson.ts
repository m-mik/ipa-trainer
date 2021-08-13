import { useQuery } from 'react-query'
import axios from 'axios'
import useLessonUi from './useLessonUi'
import { activateNextQuestion } from '../store/lessonUiActions'
import { LessonWithPronunciations } from '../types'

export function isLessonWithPronunciations(
  data: LessonResponseData
): data is LessonWithPronunciations {
  return typeof data?.questions !== 'undefined'
}

export type LessonResponseError = {
  error: string
  id: never
  status: never
  questions: never
}

export type LessonResponseData =
  | LessonWithPronunciations
  | LessonResponseError
  | undefined

function useLesson() {
  const {
    dispatch,
    state: { activeQuestion },
  } = useLessonUi()
  return useQuery(
    'lesson',
    () => axios.post<LessonResponseData>('/api/lesson').then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onSuccess(data) {
        if (isLessonWithPronunciations(data) && !activeQuestion) {
          dispatch(activateNextQuestion(data))
        }
      },
    }
  )
}

export default useLesson
