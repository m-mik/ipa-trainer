import prisma from '@/common/db'
import { LessonStatus, User, Word } from '@prisma/client'

// TODO
// export async function findRandomWordsWithPronunciation(limit: number) {
//   const words = await prisma.$queryRaw<Word[]>`
// SELECT *
// FROM "Word" w
// JOIN "Pronunciation" p
// ON w.id = p."wordId"
// WHERE w.id IN
// (
//   SELECT "wordId"
// FROM "Pronunciation"
// GROUP BY "wordId"
// ORDER BY RANDOM() LIMIT 3
// )
//)
//
//   return groupBy(words, 'wordId')
// }

export function findRandomWordsWithPronunciation(limit: number) {
  return prisma.$queryRaw<Word[]>`
    SELECT w.id FROM "Word" w 
    JOIN "Pronunciation" p 
    ON w.id = p."wordId" 
    GROUP BY w.id
	  ORDER BY RANDOM()
	  LIMIT ${limit}
  `
}

const lessonSelect = {
  questions: {
    select: {
      id: true,
      answer: true,
      word: {
        select: {
          name: true,
          partOfSpeech: true,
          pronunciations: {
            select: {
              audio: true,
              language: true,
            },
          },
        },
      },
    },
  },
}

export function findActiveLessonForUser(userId: User['id']) {
  return prisma.lesson.findFirst({
    select: lessonSelect,
    where: {
      userId,
      status: LessonStatus.ACTIVE,
    },
  })
}

export async function findOrCreateActiveLessonForUser(userId: User['id']) {
  return (
    (await findActiveLessonForUser(userId)) ??
    (await createLessonForUser(userId))
  )
}

export async function createLessonForUser(userId: User['id']) {
  const randomWordsWithPronunciation = await findRandomWordsWithPronunciation(3)
  return prisma.lesson.create({
    data: {
      userId,
      questions: {
        create: randomWordsWithPronunciation.map((word) => ({
          wordId: word.id,
        })),
      },
    },
    select: lessonSelect,
  })
}
