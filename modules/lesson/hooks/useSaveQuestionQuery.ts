import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { Language, Question } from '@prisma/client'
import useLesson from './useLesson'
import { ActionType } from '../store/lessonActions'

export type SaveQuestionData = {
  questionId: Question['id']
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
      onSuccess(data, variables, context) {
        dispatch({ type: ActionType.ResetSymbols })
        queryClient.invalidateQueries('lesson')
      },
    }
  )
}

export default useSaveQuestionQuery
