import prisma from '@/common/db'
import { PartOfSpeech, Pronunciation, Word } from '@prisma/client'

export type RequiredWord = Pick<Word, 'id' | 'name'>

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

export function updateWord(word: Partial<Word>, wordId: Word['id']) {
  return prisma.word.update({
    data: word,
    where: { id: wordId },
  })
}

export function createPronunciations(pronunciations: RequiredPronunciation[]) {
  return prisma.pronunciation.createMany({
    data: pronunciations,
    skipDuplicates: true,
  })
}

export function findWordsWithoutPronunciation(limit?: number) {
  prisma.word
  return prisma.word.findMany({
    where: {
      pronunciations: {
        none: {},
      },
    },
    take: limit,
  })
}

export function findRandomWords(limit: number) {
  return prisma.$queryRaw<Word[]>`SELECT id, word, "partOfSpeech" 
    FROM "Word" 
    ORDER BY RANDOM() LIMIT ${limit};`
}
