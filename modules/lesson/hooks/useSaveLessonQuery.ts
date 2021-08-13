import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { LessonStatus } from '@prisma/client'
import { QuestionWithPronunciations } from '../types'
import { isResponseError } from '../utils'

export type LessonWithPronunciations = {
  id: string
  questions: QuestionWithPronunciations[]
  status: LessonStatus
}

export type SaveLessonResponseError = {
  error: string
}

export type SaveLessonResponseData =
  | SaveLessonOptions['data']
  | SaveLessonResponseError

export type SaveLessonOptions = {
  lessonId: string
  data: {
    status: typeof LessonStatus.COMPLETED
  }
}

function useSaveLessonQuery() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ data, lessonId }: SaveLessonOptions) =>
      axios.patch(`/api/lesson/${lessonId}`, data).then((res) => res.data),
    {
      mutationKey: 'saveLesson',
      onSuccess(data: SaveLessonResponseData) {
        if (isResponseError(data)) return
        queryClient.setQueryData<LessonWithPronunciations | undefined>(
          ['lesson'],
          (oldData) => {
            if (!oldData) return oldData
            return {
              ...oldData,
              ...data,
            } as LessonWithPronunciations
          }
        )
      },
    }
  )
}

export default useSaveLessonQuery
