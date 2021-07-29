import { PrismaClient } from '@prisma/client'

const DEVELOPMENT = process.env.NODE_ENV === 'development'

declare const global: NodeJS.Global & { prisma?: PrismaClient }

const prisma =
  global.prisma ||
  new PrismaClient({
    log: DEVELOPMENT ? ['query', 'info', `warn`, `error`] : [],
  })

if (DEVELOPMENT) global.prisma = prisma

export default prisma
