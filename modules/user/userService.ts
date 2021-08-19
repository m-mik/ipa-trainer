import { User } from 'next-auth'
import prisma from '@/common/db'
import config from '@/common/config.json'
import { UserWithPoints } from '@/common/types/UserWithPoints'
import { LessonWithAnswersCount } from '@/common/types/LessonWithAnswersCount'

const { lesson } = config

export async function findUserById(
  userId: User['id']
): Promise<UserWithPoints | null> {
  const result = await prisma.$queryRaw<UserWithPoints[]>`
    SELECT 
        u.id, 
        u.image, 
        u.name, 
        COUNT(answer) * ${lesson.pointsPerCorrectAnswer} as points 
    FROM "Question" q
    JOIN "Lesson" l ON l.id = q."lessonId"
    RIGHT OUTER JOIN "User" u ON u.id = l."userId" AND q.answer = 'CORRECT'
    WHERE u.id = ${userId}
    GROUP BY u.id
  `
  return result.length ? result[0] : null
}

export function findLessonsByUserId(userId: User['id'], page: number) {
  const limit = 20
  const offset = limit * page - limit
  return prisma.$queryRaw<LessonWithAnswersCount[]>`
    SELECT l.id, 
           l."createdAt",
           COUNT(CASE WHEN q.answer = 'CORRECT' THEN 1 END) AS "correct", 
           COUNT(CASE WHEN q.answer = 'INCORRECT' THEN 1 END) AS "incorrect",
           COUNT(CASE WHEN q.answer = 'NONE' THEN 1 END) AS "none"
    FROM "Lesson" l
    JOIN "User" u ON l."userId" = u.id
    JOIN "Question" q ON q."lessonId" = l.id
    WHERE u.id = ${userId}
    GROUP BY l.id
    ORDER BY l."createdAt" DESC
    LIMIT ${limit}
    OFFSET ${offset};
  `
}
