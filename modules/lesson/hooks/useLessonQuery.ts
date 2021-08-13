import { useQuery } from 'react-query'
import axios from 'axios'
import useLesson from './useLesson'
import { activateNextQuestion } from '../store/lessonActions'
import { LessonWithPronunciations } from './useSaveLessonQuery'

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
      staleTime: Infinity,
      onSuccess(data) {
        if (isLessonWithPronunciations(data) && !activeQuestion) {
          dispatch(activateNextQuestion(data))
        }
      },
    }
  )
}

export default useLessonQuery
