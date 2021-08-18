import { Answer, User } from '@prisma/client'
import prisma from '@/common/db'
import { leaderboard, lesson } from '@/common/config.json'
import { LeaderboardUser } from '../types'

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

export function findUsersWithPoints(page: number) {
  const limit = leaderboard.usersPerPage
  const offset = limit * page - limit
  return prisma.$queryRaw<LeaderboardUser[]>`
    SELECT u.id, u.name, COUNT(answer) * ${lesson.pointsPerCorrectAnswer} as points FROM "Question" q
    JOIN "Lesson" l ON l.id = q."lessonId"
    RIGHT OUTER JOIN "User" u ON u.id = l."userId" AND q.answer = 'CORRECT'
    GROUP BY u.id
    ORDER BY points DESC
    LIMIT ${limit}
    OFFSET ${offset};
  `
}
