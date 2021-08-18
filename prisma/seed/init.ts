import { promises as fs } from 'fs'
import path from 'path'
import shuffle from 'lodash.shuffle'
import { createDemoUser, findDemoUser } from '@/modules/auth/authService'
import { PartOfSpeech } from '@prisma/client'
import { createWords } from './seedService'

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

async function loadWordsFromDisk() {
  const files = [
    { name: 'nouns.txt', partOfSpeech: PartOfSpeech.NOUN },
    { name: 'verbs.txt', partOfSpeech: PartOfSpeech.VERB },
    { name: 'adjectives.txt', partOfSpeech: PartOfSpeech.ADJECTIVE },
  ]
  const wordsByPartOfSpeech = await Promise.all(
    files.map(async (file) => {
      try {
        const filePath = path.join(__dirname, 'data', file.name)
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

export default async function init() {
  await initDemoUser()
  await initWords()
}
