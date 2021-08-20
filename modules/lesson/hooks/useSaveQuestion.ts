import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { Language } from '@prisma/client'
import useLessonUi from './useLessonUi'
import { ActionType } from '../store/lessonUiActions'
import { LessonWithPronunciations } from '@/types/LessonWithPronunciations'
import { QuestionWithPronunciations } from '@/types/QuestionWithPronunciations'

export type SaveQuestionOptions = {
  questionId: string
  data: {
    symbols: string
    language: Language
  }
}

function useSaveQuestion() {
  const { dispatch } = useLessonUi()
  const queryClient = useQueryClient()
  return useMutation(
    ({ questionId, data }: SaveQuestionOptions) =>
      axios
        .patch<QuestionWithPronunciations>(`/api/question/${questionId}`, data)
        .then((res) => res.data),
    {
      mutationKey: 'saveQuestion',
      onSuccess(data: QuestionWithPronunciations, variables, context) {
        queryClient.setQueryData<LessonWithPronunciations | undefined>(
          ['lesson'],
          (oldData) => {
            if (!oldData) return oldData
            return {
              ...oldData,
              questions: oldData.questions.map((question) =>
                question.id === variables.questionId ? data : question
              ),
            } as LessonWithPronunciations
          }
        )
        dispatch({ type: ActionType.SetActiveQuestion, question: data })
      },
    }
  )
}

export default useSaveQuestion
