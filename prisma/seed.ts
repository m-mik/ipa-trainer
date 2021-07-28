import { createDemoUser, findDemoUser } from '@/lib/user/service'
import prisma from '@/prisma/db'
import { FetchedWordInfo } from '@/lib/wordInfo/fetcher'

const wordInfos: FetchedWordInfo[] = [
  {
    word: 'dog',
    ukIpa: 'dɒɡ',
    ukIpaAlt: '',
    ukAudio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/ukd/ukdoc/ukdocud022.mp3',
    usIpa: 'dɑːɡ',
    usIpaAlt: '',
    usAudio:
      'https://dictionary.cambridge.org/media/english/us_pron/d/dog/dog__/dog.mp3',
    partOfSpeech: 'NOUN',
  },
  {
    word: 'dog',
    ukIpa: 'dɒɡ',
    ukIpaAlt: '',
    ukAudio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/ukd/ukdoc/ukdocud022.mp3',
    usIpa: 'dɑːɡ',
    usIpaAlt: '',
    usAudio:
      'https://dictionary.cambridge.org/media/english/us_pron/d/dog/dog__/dog.mp3',
    partOfSpeech: 'VERB',
  },
]

async function initDemoUser() {
  const demoUser = await findDemoUser()
  if (demoUser) return
  return await createDemoUser()
}

async function initWordInfos() {
  return await prisma.wordInfo.createMany({
    data: wordInfos,
    skipDuplicates: true,
  })
}

async function main() {
  await initDemoUser()
  await initWordInfos()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
