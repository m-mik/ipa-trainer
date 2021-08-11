import { PartOfSpeech, Pronunciation } from '@prisma/client'

export type FetchedPronunciation = Pick<
  Pronunciation,
  'symbols' | 'audio' | 'language'
>

export type FetchedPronunciationList = {
  [key in PartOfSpeech]?: FetchedPronunciation[]
}

export interface Dictionary {
  name: string
  baseUrl: string
  searchUrl: string
  parse: (html: string) => FetchedPronunciationList
}
