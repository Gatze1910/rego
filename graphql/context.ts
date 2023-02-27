import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

//read the docs :)
export type Context = {
  prisma: PrismaClient
  user?: any
  accessToken?: any
}

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}): Promise<Context> {
  const session = await getSession(req, res)
  // if the user is not logged in, return an empty object

  if (!session || typeof session === 'undefined') return { prisma }

  const { user, accessToken } = session
  return {
    prisma,
    user,
    accessToken,
  }
}
