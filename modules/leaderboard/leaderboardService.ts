import { User } from 'next-auth'
import { Answer } from '@prisma/client'
import prisma from '@/common/db'
import config from '@/common/config.json'
import { UserWithPoints } from '@/common/types'

const { leaderboard, lesson } = config

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
    SELECT u.id, 
           u.name, 
           u.image, 
           COUNT(answer) * ${lesson.pointsPerCorrectAnswer} as points 
    FROM "Question" q
    JOIN "Lesson" l ON l.id = q."lessonId"
    RIGHT OUTER JOIN "User" u ON u.id = l."userId" AND q.answer = 'CORRECT'
    GROUP BY u.id
    ORDER BY points DESC
    LIMIT ${limit}
    OFFSET ${offset};
  `
}
