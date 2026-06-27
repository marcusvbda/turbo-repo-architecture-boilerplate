import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const apiRes = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!apiRes.ok) {
    const error = await apiRes.json()
    return NextResponse.json(error, { status: apiRes.status })
  }

  const { access_token } = await apiRes.json()

  const res = NextResponse.json({ ok: true })
  res.cookies.set(process.env.SESSION_KEY!, JSON.stringify({ access_token }), {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  return res
}
