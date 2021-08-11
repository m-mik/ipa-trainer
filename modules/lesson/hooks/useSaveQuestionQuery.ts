import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { Language } from '@prisma/client'
import useLesson from './useLesson'
import {
  LessonResponseData,
  QuestionWithPronunciations,
} from './useLessonQuery'
import { ActionType } from '../store/lessonActions'

export type SaveQuestionData = {
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
    ({ questionId, data }: SaveQuestionData) =>
      axios.patch(`/api/question/${questionId}`, data).then((res) => res.data),
    {
      mutationKey: 'saveQuestion',
      onSuccess(data: QuestionWithPronunciations, variables, context) {
        queryClient.setQueryData<LessonResponseData>(['lesson'], (oldData) => {
          if (!oldData) return oldData
          return {
            questions: oldData.questions.map((question) =>
              question.id === variables.questionId ? data : question
            ),
          }
        })
        dispatch({ type: ActionType.SetActiveQuestion, question: data })
      },
    }
  )
}

export default useSaveQuestionQuery
