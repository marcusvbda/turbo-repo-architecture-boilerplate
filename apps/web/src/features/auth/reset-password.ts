'use server'

export async function resetPasswordAction(data: { token: string; password: string }) {
  const res = await fetch(`${process.env.API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    return { ok: false as const, message: err.message ?? 'error' }
  }
  return { ok: true as const }
}
