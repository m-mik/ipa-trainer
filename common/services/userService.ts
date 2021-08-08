import { Answer, User } from '@prisma/client'
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
