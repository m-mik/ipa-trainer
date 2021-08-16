import { Answer, Language, LessonStatus, PartOfSpeech } from '@prisma/client'

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
  id: string
  questions: QuestionWithPronunciations[]
  status: LessonStatus
}

export type PersistedSettings = {
  language: Language
  audioVolume: number
  audioAutoPlay: boolean
}
