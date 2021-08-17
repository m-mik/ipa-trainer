import prisma from '@/common/db'
import {
  Answer,
  Language,
  Lesson,
  LessonStatus,
  Pronunciation,
  Question,
  User,
  Word,
} from '@prisma/client'

const lessonSelect = {
  id: true,
  status: true,
  questions: {
    select: {
      id: true,
      answer: true,
      word: {
        select: {
          name: true,
          partOfSpeech: true,
          definition: true,
          pronunciations: {
            select: {
              id: true,
              audio: true,
              language: true,
              symbols: true,
            },
          },
        },
      },
    },
  },
}

export function findRandomWordsWithPronunciation(limit: number) {
  return prisma.$queryRaw<Word[]>`
    SELECT w.id FROM "Word" w 
    JOIN "Pronunciation" p 
    ON w.id = p."wordId" 
    GROUP BY w.id
	  ORDER BY RANDOM()
	  LIMIT ${limit};
  `
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

export async function findOrCreateActiveLessonForUser(userId: User['id']) {
  return (
    (await findActiveLessonForUser(userId)) ??
    (await createLessonForUser(userId))
  )
}

type ValidateAnswerOptions = {
  questionId: Question['id']
  userId: User['id']
  symbols: Pronunciation['symbols']
  language: Language
}

export async function validateAnswer({
  questionId,
  userId,
  symbols,
  language,
}: ValidateAnswerOptions) {
  const { _count } = await prisma.pronunciation.aggregate({
    _count: true,
    where: {
      symbols,
      language,
      word: {
        questions: {
          some: {
            id: questionId,
            lesson: {
              userId,
            },
          },
        },
      },
    },
  })
  return _count > 0
}

export function findPronunciationsForQuestion(questionId: Question['id']) {
  return prisma.question.findUnique({
    select: {
      id: true,
      answer: true,
      word: {
        select: {
          name: true,
          partOfSpeech: true,
          pronunciations: {
            select: {
              id: true,
              symbols: true,
              language: true,
              audio: true,
            },
          },
        },
      },
    },
    where: {
      id: questionId,
    },
  })
}

type AnswerQuestionOptions = {
  questionId: Question['id']
  userId: User['id']
  symbols: Pronunciation['symbols']
  language: Language
}

export async function answerQuestion(data: AnswerQuestionOptions) {
  const isCorrectAnswer = await validateAnswer(data)
  await prisma.question.updateMany({
    data: { answer: isCorrectAnswer ? Answer.CORRECT : Answer.INCORRECT },
    where: {
      id: data.questionId,
      answer: Answer.NONE,
      lesson: {
        userId: data.userId,
      },
    },
  })
  return findPronunciationsForQuestion(data.questionId)
}

type UpdateLessonOptions = {
  lessonId: Lesson['id']
  userId: User['id']
  data: Partial<Lesson>
}

export function updateLesson({ lessonId, userId, data }: UpdateLessonOptions) {
  return prisma.lesson.updateMany({
    where: {
      id: lessonId,
      userId,
      status: LessonStatus.ACTIVE,
    },
    data,
  })
}
