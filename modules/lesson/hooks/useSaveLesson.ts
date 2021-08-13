import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { LessonStatus } from '@prisma/client'
import { isResponseError } from '../utils'
import { LessonWithPronunciations } from '../types'

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

function useSaveLesson() {
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

export default useSaveLesson
