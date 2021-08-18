import prisma from '@/common/db'
import init from './seed/init'

init()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
