'use server'

export async function forgotPasswordAction(data: { email: string }) {
  const res = await fetch(`${process.env.API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    return { ok: false as const, message: err.message ?? 'Something went wrong' }
  }
  return { ok: true as const }
}
