const apiUrl = process.env.NEXT_PUBLIC_API_URL!

export const getMe = (accessToken: string) => {
  return fetch(`${apiUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}

export const refreshToken = (token: string) => {
  return fetch(`${apiUrl}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
}

export const login = async (formData: { email: string; password: string }) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  return res.json() as Promise<{ ok: boolean; message?: string }>
}
