import axios from 'axios'
import cambridge from './dict/cambridge'
import { PartOfSpeech } from '@prisma/client'
import PQueue, { DefaultAddOptions, Options } from 'p-queue'
import PriorityQueue from 'p-queue/dist/priority-queue'
import { Dictionary } from './types'

export const DEFAULT_DICTIONARY = cambridge

export const buildUrl = (searchUrl: string, name: string) => {
  const searchStr = '%s'
  if (!searchUrl.includes(searchStr)) {
    throw new Error(`searchUrl must contain search string '${searchStr}'`)
  }
  return searchUrl.replace(searchStr, name)
}

export const createFetchWordDefinition =
  ({ searchUrl, parse }: Dictionary) =>
  async ({ name, partOfSpeech }: Word) => {
    const url = buildUrl(searchUrl, name)
    const res = await axios.get<string>(url)
    return parse(res.data).find(
      (wordDefnitions) => wordDefnitions.partOfSpeech === partOfSpeech
    )
  }

export const fetchWordDefinition = createFetchWordDefinition(DEFAULT_DICTIONARY)

export type Word = {
  name: string
  partOfSpeech: PartOfSpeech
  [key: string]: any
}

type FetchWordDefinitionQueueProps = {
  words: Word[]
  options?: Options<PriorityQueue, DefaultAddOptions>
}

export const createFetchWordDefinitionQueue = ({
  words,
  options,
}: FetchWordDefinitionQueueProps) => {
  const queue = new PQueue(options)
  let count = 0

  words.forEach((word) =>
    queue
      .add(() =>
        fetchWordDefinition({
          name: word.name,
          partOfSpeech: word.partOfSpeech,
        })
      )
      .then((wordDefinitions) => {
        queue.emit<any>('fetchEnd', word, wordDefinitions)
      })
      .catch((e) => console.error(`Could not fetch word, '${word}': ${e}`))
  )

  queue.on('active', () => {
    const { name, partOfSpeech } = words[count++]
    console.log(
      `Fetching '${name}' (${partOfSpeech}) word definition. Size: ${queue.size} Pending: ${queue.pending}`
    )
  })

  return queue
}
