import prisma from '@/prisma/db'

export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  })
}

export async function findDemoUser() {
  return await prisma.user.findFirst({
    where: {
      name: process.env.DEMO_USERNAME,
      accounts: {
        none: {},
      },
    },
  })
}
