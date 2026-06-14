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
    SELECT 
      u.id,
      u.name,
      u.image,
      (COALESCE(COUNT(q.answer), 0)::int * ${lesson.pointsPerCorrectAnswer})::int AS points
    FROM "User" u
    LEFT JOIN "Lesson" l ON l."userId" = u.id
    LEFT JOIN "Question" q 
      ON q."lessonId" = l.id 
      AND q.answer = 'CORRECT'
    GROUP BY u.id, u.name, u.image
    ORDER BY points DESC
    LIMIT ${limit}
    OFFSET ${offset};
  `
}
