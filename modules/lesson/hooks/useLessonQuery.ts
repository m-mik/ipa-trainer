import { useQuery } from 'react-query'
import axios from 'axios'
import useLesson from './useLesson'
import { ActionType } from '../store/lessonActions'
import { Answer } from '@prisma/client'
import { ActiveQuestion } from '../types/ActiveQuestion'

function useLessonQuery() {
  const { dispatch } = useLesson()
  return useQuery(
    'lesson',
    () => axios.post('/api/lesson').then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const firstQuestionWithoutAnswer = data.questions.find(
          (question: ActiveQuestion) => question.answer === Answer.NONE
        )
        dispatch({
          type: ActionType.SetActiveQuestion,
          question: firstQuestionWithoutAnswer,
        })
      },
    }
  )
}

export default useLessonQuery
