'use server'

import { getCookie } from '@/features/cookies/get-cookie'

export async function getAccessTokenAction() {
  const session = await getCookie(process.env.SESSION_KEY!)
  return session ? (JSON.parse(session) as { access_token: string }).access_token : null
}
