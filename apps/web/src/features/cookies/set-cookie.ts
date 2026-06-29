'use server'

import { cookies } from 'next/headers'

type CookieOptions = {
  path?: string
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'lax' | 'strict' | 'none' | boolean
  maxAge?: number
  expires?: Date
}

export async function setCookie(name: string, value: string, options?: CookieOptions) {
  const cookie = await cookies()
  cookie.set(name, value, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    ...(options ? options : {}),
  })
}
