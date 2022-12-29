//source: https://stackoverflow.com/questions/69850598/how-to-resolve-this-typescript-error-on-global-node-js-object
declare global {
  var prisma: PrismaClient; 
}

import { PrismaClient } from '@prisma/client'
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
