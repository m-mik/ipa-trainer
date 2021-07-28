import axios from 'axios'
import { WordInfo } from '@prisma/client'
import { cambridge } from '@/lib/wordInfo/fetcher/dict'

export const DEFAULT_DICTIONARY = cambridge

export type FetchedWordInfo = Omit<WordInfo, 'id' | 'createdAt' | 'updatedAt'>

export interface Dictionary {
  name: string
  baseUrl: string
  searchUrl: string
  parse: (html: string) => FetchedWordInfo[]
}

export const buildAudioUrl = (baseUrl: string, audioPath: string | undefined) =>
  audioPath ? `${baseUrl}${audioPath}` : ''

export const buildUrl = (searchUrl: string, word: string) => {
  const searchStr = '%s'
  if (!searchUrl.includes(searchStr)) {
    throw new Error(`searchUrl must contain search string '${searchStr}'`)
  }
  return searchUrl.replace(searchStr, word)
}

export const wordInfoFetcher =
  ({ searchUrl, parse }: Dictionary) =>
  async (word: string) => {
    const url = buildUrl(searchUrl, word)
    const res = await axios.get<string>(url)
    return parse(res.data)
  }

const fetchWordInfos = wordInfoFetcher(DEFAULT_DICTIONARY)

export default fetchWordInfos
