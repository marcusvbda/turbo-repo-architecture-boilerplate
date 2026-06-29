'use server'

import { cookies } from 'next/headers'

export async function getCookie(name: string) {
  const cookie = await cookies()
  return cookie.get(name)?.value
}
