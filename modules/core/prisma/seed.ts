import { promises as fs } from 'fs'
import PQueue from 'p-queue'
import { createDemoUser, findDemoUser } from '@/lib/user/service'
import prisma from '@/prisma/db'
import fetchWordInfos from '@/lib/word/fetcher'
import { createWordInfos } from '@/lib/word/service'

async function initDemoUser() {
  const demoUser = await findDemoUser()
  if (demoUser) return
  return await createDemoUser()
}

async function initWordInfos() {
  const words = await loadWords()
  const queue = new PQueue({ concurrency: 1, interval: 5000, intervalCap: 1 })
  let count = 0

  words.slice(0, 10).forEach((word) => {
    queue
      .add(() => fetchWordInfos(word))
      .then((wordInfos) => {
        createWordInfos(wordInfos)
      })
      .catch((e) =>
        console.error(`Could not init wordInfo for '${word}': ${e}`)
      )
  })

  queue.on('active', () =>
    console.log(
      `Initializing info for word '${words[count++]}'. Size: ${
        queue.size
      } Pending: ${queue.pending}`
    )
  )

  queue.on('idle', () => console.log('Finished initializing wordInfos'))
}

async function main() {
  await initWordInfos()
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
