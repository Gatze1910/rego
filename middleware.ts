import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const user = await getSession(req, res)
  const url = req.nextUrl.pathname.split('/')

  if (!user) {
    return NextResponse.redirect(new URL('/403', req.url))
  }

  if (url.pop() === 'edit') {
    console.log('hallo')
    const result = await CheckUserShop(user.user.sub, url.pop())
    console.log(result)
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

const GetShopData = gql`
  query Shop($id: Int!) {
    shop(id: $id) {
      ownerUuid
    }
  }
`

async function CheckUserShop(userId, shopId) {
  const gql = await fetch('http://localhost:3000/api/graphql', {
    body: `{"query":"query Shop {shop(id: ${shopId}) {ownerUuid  }}","variables":{}}`,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => data.data.shop.ownerUuid)

  return gql === userId ? true : false
}
