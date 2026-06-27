import { post, get } from './api'

const apiUrl = process.env.NEXT_PUBLIC_API_URL!

export const getMe = (token: string) => {
  return get(`${apiUrl}/auth/me`, { token })
}

export const refreshToken = (token: string) => {
  return post(`${apiUrl}/auth/refresh`, { token })
}

export const login = (formData: { email: string; password: string }) => {
  return post('/api/auth/login', formData)
}

export const register = (formData: { username: string; email: string; password: string }) => {
  return post(`${apiUrl}/auth/register`, formData)
}

export const confirmEmail = (formData: { token: string }) => {
  return post(`${apiUrl}/auth/confirm-email`, formData)
}

export const forgotPassword = (formData: { email: string }) => {
  return post(`${apiUrl}/auth/forgot-password`, formData)
}

export const resetPassword = (formData: { token: string; password: string }) => {
  return post(`${apiUrl}/auth/reset-password`, formData)
}
