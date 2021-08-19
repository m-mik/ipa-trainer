import { User } from 'next-auth'
import prisma from '@/common/db'
import config from '@/common/config.json'
import { UserWithPoints } from '@/common/types/UserWithPoints'

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
