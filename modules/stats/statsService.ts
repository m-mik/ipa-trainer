import prisma from '@/common/db'

export async function getStats() {
  const answers = await prisma.question.groupBy({
    by: ['answer'],
    _count: true,
  })

  return {
    users: await prisma.user.count(),
    lessons: await prisma.lesson.count(),
    answers: answers.reduce(
      (result, { answer, _count }) => ({
        ...result,
        [answer.toLowerCase()]: _count,
      }),
      {}
    ),
    words: await prisma.word.count(),
    pronunciations: await prisma.pronunciation.count(),
  }
}
