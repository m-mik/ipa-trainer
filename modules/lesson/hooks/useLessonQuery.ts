import { useQuery } from 'react-query'
import axios from 'axios'
import useLesson from './useLesson'
import { ActionType } from '../store/lessonActions'
import { Answer, Language, PartOfSpeech } from '@prisma/client'
import { ActiveQuestion } from '../types/ActiveQuestion'

type LessonResponseData = {
  questions: Array<{
    id: string
    answer: Answer
    word: {
      name: string
      partOfSpeech: PartOfSpeech
      pronunciations: [
        {
          audio: string
          language: Language
        }
      ]
    }
  }>
}

function useLessonQuery() {
  const { dispatch } = useLesson()
  return useQuery(
    'lesson',
    () => axios.post<LessonResponseData>('/api/lesson').then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        const firstQuestionWithoutAnswer =
          data.questions.find(
            (question: ActiveQuestion) => question.answer === Answer.NONE
          ) ?? null
        dispatch({
          type: ActionType.SetActiveQuestion,
          question: firstQuestionWithoutAnswer,
        })
      },
    }
  )
}

export default useLessonQuery
