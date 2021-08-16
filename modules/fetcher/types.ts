import { PartOfSpeech, Pronunciation } from '@prisma/client'

export type WordDefinition = {
  name: string
  partOfSpeech: PartOfSpeech
  definition: string
  pronunciations: Pick<Pronunciation, 'symbols' | 'audio' | 'language'>[]
}

export interface Dictionary {
  name: string
  baseUrl: string
  searchUrl: string
  parse: (html: string) => WordDefinition[]
}
