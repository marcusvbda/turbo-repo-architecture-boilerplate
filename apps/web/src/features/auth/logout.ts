'use server'

import { deleteCookie } from '@/features/cookies/delete-cookie'
import { getAccessTokenAction } from '@/features/auth/get-access-token'

export async function logoutAction() {
  const accessToken = await getAccessTokenAction()

  if (accessToken) {
    await fetch(`${process.env.API_URL}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    }).catch(() => {})
  }

  await deleteCookie(process.env.SESSION_KEY!)
  return { ok: true as const }
}
