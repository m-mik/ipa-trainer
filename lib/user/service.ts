import prisma from '@/prisma/db'
import { Answer, User } from '@prisma/client'

export function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  })
}

export function findDemoUser() {
  return prisma.user.findFirst({
    where: {
      name: process.env.DEMO_USERNAME,
      accounts: {
        none: {},
      },
    },
  })
}

export async function createDemoUser() {
  await createUser({ name: process.env.DEMO_USERNAME })
}

export function createUser(user: Partial<User>) {
  prisma.user.create({ data: user })
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
