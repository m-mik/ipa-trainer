import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { LessonStatus } from '@prisma/client'
import { LessonWithPronunciations } from '@/common/types'

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
      axios
        .patch<SaveLessonOptions['data']>(`/api/lesson/${lessonId}`, data)
        .then((res) => res.data),
    {
      mutationKey: 'saveLesson',
      onSuccess(data) {
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
