import { Answer, User, Word } from '@prisma/client'
import prisma from '@/common/db'

export function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  })
}

export async function calculateUserPoints(userId: User['id']) {
  const correctAnswers = await prisma.question.aggregate({
    where: {
      lesson: {
        userId,
      },
      answer: Answer.CORRECT,
    },
    _count: true,
  })
  return correctAnswers._count * 50
}

export function findUsers() {
  return prisma.$queryRaw<Word[]>`
    SELECT w.id FROM "Word" w 
    JOIN "Pronunciation" p 
    ON w.id = p."wordId" 
    GROUP BY w.id
	  ORDER BY RANDOM()
	  LIMIT ${limit}
  `
}
