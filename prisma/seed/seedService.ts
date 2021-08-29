import { PartOfSpeech, Pronunciation, Word } from '@prisma/client'
import prisma from '@/common/db'

export function createWords(
  words: Array<{ name: string; partOfSpeech: PartOfSpeech }>
) {
  return prisma.word.createMany({
    data: words,
    skipDuplicates: true,
  })
}

type CreatePronunciationsData = {
  wordId: Word['id']
  name: Word['name']
  definition: Word['definition']
  partOfSpeech: Word['partOfSpeech']
  pronunciations: {
    audio: Pronunciation['audio']
    symbols: Pronunciation['symbols']
    language: Pronunciation['language']
  }[]
}

export function createPronunciations({
  wordId,
  name,
  definition,
  partOfSpeech,
  pronunciations,
}: CreatePronunciationsData) {
  return prisma.$transaction([
    prisma.pronunciation.createMany({
      data: pronunciations.map((pronunciation) => ({
        ...pronunciation,
        wordId,
      })),
      skipDuplicates: true,
    }),
    prisma.word.update({
      data: {
        definition,
        partOfSpeech,
      },
      where: {
        id: wordId,
      },
    }),
  ])
}

export function findWordsWithoutPronunciation(limit?: number) {
  return prisma.word.findMany({
    where: {
      pronunciations: {
        none: {},
      },
    },
    take: limit,
  })
}
