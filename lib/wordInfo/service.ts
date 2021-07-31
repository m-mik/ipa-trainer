import prisma from '@/prisma/db'
import { WordInfo } from '@prisma/client'

export type RequiredWordInfo = Omit<WordInfo, 'id' | 'createdAt' | 'updatedAt'>

export function createWordInfos(wordInfos: RequiredWordInfo[]) {
  return prisma.wordInfo.createMany({
    data: wordInfos,
    skipDuplicates: true,
  })
}

export function createWordInfo(wordInfo: RequiredWordInfo) {
  return createWordInfos([wordInfo])
}

export function updateWordInfo(
  wordInfo: Partial<RequiredWordInfo>,
  wordInfoId: WordInfo['id']
) {
  return prisma.wordInfo.update({
    data: wordInfo,
    where: { id: wordInfoId },
  })
}

export function findRandomWordInfos(count: number) {
  return prisma.$queryRaw<
    WordInfo[]
  >`SELECT id, word, "partOfSpeech", "ukIpa", "ukIpaAlt", "ukAudio", "usIpa", "usIpaAlt", "usAudio" 
    FROM "WordInfo" 
    ORDER BY RANDOM() LIMIT ${count};`
}
