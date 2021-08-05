import axios from 'axios'
import cambridge from './dict/cambridge'
import { RequiredWord } from '@/services/wordService'

export const DEFAULT_DICTIONARY = cambridge

export type FetchedWord = RequiredWord

export interface Dictionary {
  name: string
  baseUrl: string
  searchUrl: string
  parse: (html: string) => FetchedWord[]
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

export const fetcher =
  ({ searchUrl, parse }: Dictionary) =>
  async (word: string) => {
    const url = buildUrl(searchUrl, word)
    const res = await axios.get<string>(url)
    return parse(res.data)
  }

const fetchWord = fetcher(DEFAULT_DICTIONARY)

fetchWord(word)

export default fetchWords
