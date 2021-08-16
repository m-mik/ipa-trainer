import { promises as fs } from 'fs'
import path from 'path'
import shuffle from 'lodash.shuffle'
import prisma from '@/common/db'
import { createDemoUser, findDemoUser } from '@/modules/auth/authService'
import { PartOfSpeech } from '@prisma/client'
import { WordDefinition } from '@/modules/fetcher/types'
import {
  createPronunciations,
  createWords,
  findWordsWithoutPronunciation,
} from '@/common/services/wordService'
import {
  createFetchWordDefinitionQueue,
  Word,
} from '@/modules/fetcher/fetchWordDefinition'

async function initDemoUser() {
  const demoUser = await findDemoUser()
  if (demoUser) {
    console.log(`DB: Found demo user: ${demoUser.name}`)
  } else {
    const createdDemoUser = await createDemoUser()
    console.log(`DB: Created demo user: ${createdDemoUser.name}`)
  }
}

async function initWords() {
  const words = await loadWordsFromDisk()
  const createdWords = await createWords(words)
  console.log(`DB: Created ${createdWords.count} word(s)`)
}

async function initPronunciations() {
  const wordsWithoutPronunciation = await findWordsWithoutPronunciation(5)
  console.log(
    `DB: Found ${wordsWithoutPronunciation.length} word(s) without a pronunciation`
  )

  const fetchWordDefinitionQueue = createFetchWordDefinitionQueue({
    words: wordsWithoutPronunciation,
    options: {
      concurrency: 1,
      interval: 3000,
      intervalCap: 1,
      autoStart: false,
    },
  })

  fetchWordDefinitionQueue.on<any>(
    'fetchEnd',
    async (word: Word, wordDefinition: WordDefinition) => {
      if (!wordDefinition) {
        return console.log(
          `Could not find word definition for: '${word.name}' (${word.partOfSpeech})`
        )
      }

      const [{ count }] = await createPronunciations({
        ...wordDefinition,
        wordId: word.id,
      })

      console.log(
        `DB: Created ${count} pronunciations for '${word.name}' (${word.partOfSpeech})`
      )
    }
  )

  fetchWordDefinitionQueue.start()
}

async function main() {
  await initDemoUser()
  await initWords()
  await initPronunciations()
}

export async function loadWordsFromDisk() {
  const files = [
    { name: 'nouns.txt', partOfSpeech: PartOfSpeech.NOUN },
    { name: 'verbs.txt', partOfSpeech: PartOfSpeech.VERB },
    { name: 'adjectives.txt', partOfSpeech: PartOfSpeech.ADJECTIVE },
  ]
  const wordsByPartOfSpeech = await Promise.all(
    files.map(async (file) => {
      try {
        const filePath = path.join(process.cwd(), 'common/data', file.name)
        const wordStr = await fs.readFile(filePath, 'utf-8')
        return wordStr
          .trim()
          .split('\n')
          .map((word) => ({ name: word, partOfSpeech: file.partOfSpeech }))
      } catch (e) {
        throw new Error(
          `Could not load words from file ${file.name}: ${e.message}`
        )
      }
    })
  )
  return shuffle(wordsByPartOfSpeech.flat())
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
