import prisma from '@/common/db'
import { createUser } from '@/services/userService'

export function findDemoUser() {
  return prisma.user.findFirst({
    where: {
      name: process.env.DEMO_USERNAME,
      accounts: {
        none: {},
      },
    },
  })
}

export async function createDemoUser() {
  await createUser({ name: process.env.DEMO_USERNAME })
}
