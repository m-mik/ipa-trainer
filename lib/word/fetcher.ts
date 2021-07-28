import axios from 'axios'
import cheerio, { Cheerio, Element } from 'cheerio'
import { PartOfSpeech, Word } from '@prisma/client'

export interface Dictionary {
  name: string
  baseUrl: string
  searchUrl: string
  parse: (html: string) => FetchedWord[]
}

export type FetchedWord = Omit<Word, 'id'>

export const cambridge: Dictionary = {
  name: 'Cambridge Dictionary',
  baseUrl: 'https://dictionary.cambridge.org',
  searchUrl: 'https://dictionary.cambridge.org/dictionary/english/%s',
  parse: (html) => {
    const $ = cheerio.load(html)
    const sections = $('.pr.dictionary:first-of-type .pos-header')
    return sections.map((_, section) => extractWord($(section))).toArray()
  },
}

export const extractWord = (el: Cheerio<Element>): FetchedWord => {
  return {
    name: el.find('.hw.dhw')?.text(),
    ukIpa: el.find('.uk .ipa')?.text(),
    ukIpaAlt: el.find('.uk + span:not(.dpron-i) .ipa')?.text(),
    ukAudio: buildAudioUrl(
      cambridge.baseUrl,
      el.find('.uk source:first-of-type')?.attr('src')
    ),
    usIpa: el.find('.us .ipa')?.text(),
    usIpaAlt: el.find('.us + span:not(.dpron-i) .ipa')?.text(),
    usAudio: buildAudioUrl(
      cambridge.baseUrl,
      el.find('.us source:first-of-type')?.attr('src')
    ),
    partOfSpeech: el.find('.pos')?.text() as PartOfSpeech,
  }
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

export const wordFetcher =
  ({ searchUrl, parse }: Dictionary) =>
  async (word: string) => {
    const url = buildUrl(searchUrl, word)
    const res = await axios.get<string>(url)
    return parse(res.data)
  }

export const fetchWord = wordFetcher(cambridge)
