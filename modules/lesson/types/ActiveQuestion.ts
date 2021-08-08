import { Answer, Language, PartOfSpeech } from '@prisma/client'

export type ActiveQuestion = {
  id: string
  answer: Answer
  word: {
    partOfSpeech: PartOfSpeech
    name: string
    pronunciations: [
      {
        audio: string
        language: Language
      }
    ]
  }
}
