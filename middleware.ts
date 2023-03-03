import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const user = await getSession(req, res)
  const url = req.nextUrl.pathname.split('/')

  if (!user) {
    return NextResponse.redirect(new URL('/403', req.url))
  }

  if (url.pop() === 'edit') {
    const result = await checkIfUserIsShopOwner(user.user.sub, url.pop())
    if (!result) {
      return NextResponse.redirect(new URL('/403', req.url))
    }
  }

  return res
}
// im config angeben welche pages geprüft werden sollten
export const config = {
  matcher: [
    '/shops/create',
    '/shops/:path/edit',
    '/shops/:path/products/:path*',
    '/myshops',
  ],
}

async function checkIfUserIsShopOwner(userId, shopId) {
  let apiUrl = 'http://localhost:3000/api/graphql'

  if(process.env.NODE_ENV === 'production') {
    apiUrl = 'https://rego-tau.vercel.app/api/graphql'
  }
  
  const gql = await fetch(`${apiUrl}`, {
    body: `{"query":"query Shop {shop(id: ${shopId}) {ownerUuid  }}","variables":{}}`,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => data?.data?.shop?.ownerUuid)

  return gql === userId ? true : false
}
