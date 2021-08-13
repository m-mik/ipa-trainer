import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { Language } from '@prisma/client'
import useLesson from './useLesson'
import { ActionType } from '../store/lessonActions'
import { LessonWithPronunciations, QuestionWithPronunciations } from '../types'

export type SaveQuestionOptions = {
  questionId: string
  data: {
    symbols: string
    language: Language
  }
}

function useSaveQuestionQuery() {
  const { dispatch } = useLesson()
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

export default useSaveQuestionQuery
