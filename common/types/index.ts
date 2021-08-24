import { Answer, Language, LessonStatus, PartOfSpeech } from '@prisma/client'

export type LessonWithAnswersCount = {
  id: string
  createdAt: string
  correct: number
  incorrect: number
  none: number
}

export type LessonWithPronunciations = {
  id: string
  questions: QuestionWithPronunciations[]
  status: LessonStatus
}

export type QuestionWithPronunciations = {
  id: string
  answer: Answer
  word: {
    name: string
    definition?: string
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

export type ResponseError = {
  message: string
  code: number
}

export type UserWithPoints = {
  id: string
  name: string
  image: string
  points: number
}

export type Stats = {
  users: number
  words: number
  answers: {
    none: number
    correct: number
    incorrect: number
  }
}
