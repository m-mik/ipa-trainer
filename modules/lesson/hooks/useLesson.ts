import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import useLessonUi from './useLessonUi'
import { activateNextQuestion } from '../store/lessonUiActions'
import { LessonWithPronunciations } from '../types'
import { ResponseError } from '@/common/types'

function fetchLesson(): Promise<LessonWithPronunciations> {
  return axios
    .post<LessonWithPronunciations>('/api/lesson')
    .then((res) => res.data)
}

function useLesson() {
  const {
    dispatch,
    state: { activeQuestion },
  } = useLessonUi()
  return useQuery<LessonWithPronunciations, AxiosError<ResponseError>>(
    'lesson',
    fetchLesson,
    {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onSuccess(data) {
        if (!activeQuestion) {
          dispatch(activateNextQuestion(data))
        }
      },
    }
  )
}

export default useLesson
