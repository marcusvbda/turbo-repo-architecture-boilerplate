import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getMe, refreshToken } from './services/auth'

const redirectToLogin = (req: NextRequest) => {
  const callbackUrl = req.nextUrl.pathname
  const url = req.nextUrl.clone()
  url.pathname = '/auth/signin'
  url.searchParams.set('callbackUrl', callbackUrl)
  return NextResponse.redirect(url)
}

const clearSession = (req: NextRequest) => {
  const resp = redirectToLogin(req)
  resp.cookies.delete(process.env.SESSION_KEY!)
  return resp
}

export default async function proxy(req: NextRequest) {
  const sessionKey = process.env.SESSION_KEY!

  if (req.nextUrl.pathname.startsWith('/auth')) {
    const res = NextResponse.next()
    res.cookies.delete(sessionKey)
    return res
  }

  const session = req.cookies.get(sessionKey)?.value

  if (!session) return redirectToLogin(req)

  try {
    let { access_token } = JSON.parse(session) as { access_token: string }
    let meRes = await getMe(access_token)
    let refreshed = false

    if (!meRes.ok) {
      const refreshRes = await refreshToken(access_token)
      if (!refreshRes.ok) return clearSession(req)

      access_token = ((await refreshRes.json()) as { access_token: string }).access_token
      refreshed = true
      meRes = await getMe(access_token)
    }

    const user = await meRes.json()
    const nextRes = NextResponse.next()
    nextRes.headers.set(`x-${sessionKey}`, JSON.stringify({ user, token: access_token }))

    if (refreshed) {
      nextRes.cookies.set(sessionKey, JSON.stringify({ access_token }), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
    }

    return nextRes
  } catch {
    return clearSession(req)
  }
}

export const config = {
  matcher: ['/((?!api/auth|static|_next|.well-known|_vercel|images|favicon).*)'],
}
