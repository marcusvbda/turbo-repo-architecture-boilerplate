const apiUrl = process.env.API_URL!

export const getMe = (accessToken: string) =>
  fetch(`${apiUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

export const refreshToken = (token: string) =>
  fetch(`${apiUrl}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
