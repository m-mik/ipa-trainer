import {
  createPronunciations,
  findWordsWithoutPronunciation,
} from './seedService'
import {
  createFetchWordDefinitionQueue,
  Word,
} from '@/modules/fetcher/fetchWordDefinition'
import { WordDefinition } from '@/modules/fetcher/types'
import prisma from '@/common/db'

async function initPronunciations() {
  const wordsWithoutPronunciation = await findWordsWithoutPronunciation(20)
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

initPronunciations()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
