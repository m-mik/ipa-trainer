import prisma from '@/common/db'
import { Word } from '@prisma/client'

export type RequiredWord = Omit<Word, 'id' | 'createdAt' | 'updatedAt'>

export function createWords(words: RequiredWord[]) {
  return prisma.word.createMany({
    data: words,
    skipDuplicates: true,
  })
}

export function updateWord(word: Partial<RequiredWord>, wordId: Word['id']) {
  return prisma.word.update({
    data: word,
    where: { id: wordId },
  })
}

export function findRandomWords(count: number) {
  return prisma.$queryRaw<Word[]>`SELECT id, word, "partOfSpeech" 
    FROM "Word" 
    ORDER BY RANDOM() LIMIT ${count};`
}
