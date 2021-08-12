import { Answer, Language, PartOfSpeech } from '@prisma/client'

export type QuestionWithPronunciations = {
  id: string
  answer: Answer
  word: {
    name: string
    partOfSpeech: PartOfSpeech
    pronunciations: [
      {
        id: string
        audio: string
        language: Language
        symbols?: string
      }
    ]
  }
}

export type LessonWithPronunciations = {
  questions: QuestionWithPronunciations[]
  error: never
}

export type LessonResponseError = {
  error: string
  questions: never
}

export type LessonResponseData =
  | LessonWithPronunciations
  | LessonResponseError
  | undefined
