'use server'

import { setCookie } from '@/features/cookies/set-cookie'

export async function loginAction(data: { email: string; password: string }) {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    return { ok: false as const, message: err.message ?? 'Invalid credentials' }
  }
  const { access_token } = await res.json()
  await setCookie(process.env.SESSION_KEY!, JSON.stringify({ access_token }))
  return { ok: true as const }
}
