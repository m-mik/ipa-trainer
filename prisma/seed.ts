import { promises as fs } from 'fs'
import PQueue from 'p-queue'
import prisma from '@/common/db'
import fetchWords from '@/modules/fetcher'
import { createWords } from '@/services/wordService'
import { createDemoUser, findDemoUser } from '@/modules/auth/authService'

async function initDemoUser() {
  const demoUser = await findDemoUser()
  if (demoUser) return
  return await createDemoUser()
}

async function initWords() {
  const words = await loadWords()
  const queue = new PQueue({ concurrency: 1, interval: 5000, intervalCap: 1 })
  let count = 0

  words.slice(0, 10).forEach((word) => {
    queue
      .add(() => fetchWords(word))
      .then((words) => {
        createWords(words)
      })
      .catch((e) => console.error(`Could not initialize word, '${word}': ${e}`))
  })

  queue.on('active', () =>
    console.log(
      `Initializing word, '${words[count++]}'. Size: ${queue.size} Pending: ${
        queue.pending
      }`
    )
  )

  queue.on('idle', () => console.log('Finished initializing words'))
}

async function main() {
  //await initWords()
  await initDemoUser()
}

export async function loadWords() {
  const path = __dirname + '/most-common-words.txt'
  try {
    const wordStr = await fs.readFile(path, 'utf-8')
    return wordStr.trim().split('\n')
  } catch (e) {
    throw new Error(`Could not load words from ${path}: ${e.message}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
