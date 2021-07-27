import { createDemoUser, findDemoUser } from '@/lib/user/service'
import prisma from '@/prisma/db'

async function init() {
  const demoUser = await findDemoUser()
  if (!demoUser) {
    console.log('Demo user not found')
    await createDemoUser()
    console.log('Created a new demo user')
  } else {
    console.log('Demo user found', demoUser)
  }
}

init()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
