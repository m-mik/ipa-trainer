import { Answer } from '@prisma/client'
import prisma from '@/common/db'
import config from '@/common/config.json'
import { User } from 'next-auth'

const { leaderboard, lesson } = config

export type UserWithPoints = {
  id: string
  name: string
  image: string
  points: number
}

export async function findUserById(
  userId: User['id']
): Promise<UserWithPoints | null> {
  const result = await prisma.$queryRaw<UserWithPoints[]>`
    SELECT u.id, u.image, u.name, COUNT(answer) * ${lesson.pointsPerCorrectAnswer} as points 
    FROM "Question" q
    JOIN "Lesson" l ON l.id = q."lessonId"
    RIGHT OUTER JOIN "User" u ON u.id = l."userId" AND q.answer = 'CORRECT'
    WHERE u.id = ${userId}
    GROUP BY u.id
  `
  return result.length ? result[0] : null
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
  return correctAnswers._count * lesson.pointsPerCorrectAnswer
}

export function findUsers(page: number) {
  const limit = leaderboard.usersPerPage
  const offset = limit * page - limit
  return prisma.$queryRaw<UserWithPoints[]>`
    SELECT u.id, u.name, u.image, COUNT(answer) * ${lesson.pointsPerCorrectAnswer} as points 
    FROM "Question" q
    JOIN "Lesson" l ON l.id = q."lessonId"
    RIGHT OUTER JOIN "User" u ON u.id = l."userId" AND q.answer = 'CORRECT'
    GROUP BY u.id
    ORDER BY points DESC
    LIMIT ${limit}
    OFFSET ${offset};
  `
}
