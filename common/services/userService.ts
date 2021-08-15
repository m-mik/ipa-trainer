import { Answer, User, Word } from '@prisma/client'
import prisma from '@/common/db'
import { CORRECT_ANSWER_POINTS } from '@/modules/lesson/config'
import { USERS_PER_PAGE } from '@/modules/leaderboard/config'

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
  return correctAnswers._count * CORRECT_ANSWER_POINTS
}

export function findUsersWithPoints(page: number) {
  const limit = USERS_PER_PAGE
  const offset = limit * page - limit
  return prisma.$queryRaw<Word[]>`
    SELECT u.id, u.name, COUNT(answer) * ${CORRECT_ANSWER_POINTS} as points FROM "Question" q
    JOIN "Lesson" l ON l.id = q."lessonId"
    RIGHT OUTER JOIN "User" u ON u.id = l."userId" AND q.answer = 'CORRECT'
    GROUP BY u.id
    ORDER BY points DESC
    LIMIT ${limit}
    OFFSET ${offset};
  `
}
