'use server'

import { cookies } from 'next/headers'

export async function deleteCookie(name: string) {
  const cookie = await cookies()
  cookie.delete(name)
}
