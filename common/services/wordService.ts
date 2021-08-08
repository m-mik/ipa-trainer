import { PartOfSpeech, Pronunciation } from '@prisma/client'
import prisma from '../db'

export type RequiredPronunciation = Omit<
  Pronunciation,
  'id' | 'createdAt' | 'updatedAt'
>

export function createWords(
  words: Array<{ name: string; partOfSpeech: PartOfSpeech }>
) {
  return prisma.word.createMany({
    data: words,
    skipDuplicates: true,
  })
}

export function createPronunciations(pronunciations: RequiredPronunciation[]) {
  return prisma.pronunciation.createMany({
    data: pronunciations,
    skipDuplicates: true,
  })
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
