import prisma from '@/common/db'
import { Credentials } from './types/Credentials'
import { User } from '@prisma/client'

export function loginDemoUser(credentials: Credentials) {
  const { username, password } = credentials
  if (
    process.env.DEMO_USERNAME !== username ||
    process.env.DEMO_PASSWORD !== password
  )
    return null

  return findDemoUser()
}

export function createUser(user: Partial<User>) {
  return prisma.user.create({ data: user })
}

export function findDemoUser() {
  return prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      image: true,
    },
    where: {
      name: process.env.DEMO_USERNAME,
      accounts: {
        none: {},
      },
    },
  })
}

export async function createDemoUser() {
  return createUser({ name: process.env.DEMO_USERNAME })
}
