'use server'

export async function registerAction(data: { username: string; email: string; password: string }) {
  const res = await fetch(`${process.env.API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    return { ok: false as const, message: err.message ?? 'Registration failed' }
  }
  return { ok: true as const }
}
