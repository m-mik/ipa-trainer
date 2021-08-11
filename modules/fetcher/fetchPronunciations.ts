import axios from 'axios'
import cambridge from './dict/cambridge'
import { PartOfSpeech } from '@prisma/client'
import PQueue, { DefaultAddOptions, Options } from 'p-queue'
import PriorityQueue from 'p-queue/dist/priority-queue'
import { Dictionary } from './types'

export const DEFAULT_DICTIONARY = cambridge

export const buildUrl = (searchUrl: string, word: string) => {
  const searchStr = '%s'
  if (!searchUrl.includes(searchStr)) {
    throw new Error(`searchUrl must contain search string '${searchStr}'`)
  }
  return searchUrl.replace(searchStr, word)
}

export const createFetchPronunciations =
  ({ searchUrl, parse }: Dictionary) =>
  async (word: string, partOfSpeech?: PartOfSpeech) => {
    const url = buildUrl(searchUrl, word)
    const res = await axios.get<string>(url)
    const pronunciationList = parse(res.data)
    return partOfSpeech ? pronunciationList[partOfSpeech] : pronunciationList
  }

export const fetchPronunciations = createFetchPronunciations(DEFAULT_DICTIONARY)

export type Word = {
  name: string
  partOfSpeech: PartOfSpeech
  [key: string]: any
}

type PronunciationsFetchQueueProps = {
  words: Word[]
  options?: Options<PriorityQueue, DefaultAddOptions>
}

export const createPronunciationsFetchQueue = ({
  words,
  options,
}: PronunciationsFetchQueueProps) => {
  const queue = new PQueue(options)
  let count = 0

  words.forEach((word) =>
    queue
      .add(() => fetchPronunciations(word.name, word.partOfSpeech))
      .then((pronunciations) => {
        queue.emit<any>('fetchEnd', word, pronunciations)
      })
      .catch((e) => console.error(`Could not fetch word, '${word}': ${e}`))
  )

  queue.on('active', () => {
    console.log(
      `Fetching '${words[count++].name}' pronunciations. Size: ${
        queue.size
      } Pending: ${queue.pending}`
    )
  })

  return queue
}
