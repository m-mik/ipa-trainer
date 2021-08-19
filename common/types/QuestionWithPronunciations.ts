import { Answer, Language, PartOfSpeech } from '@prisma/client'

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
