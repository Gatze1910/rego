import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const user = await getSession(req, res)
  if (!user) {
    return NextResponse.redirect(new URL('/403', req.url))
  }
  return res
}
// im config angeben welche pages geprüft werden sollten
export const config = {
  matcher: '/shops/create',
}
