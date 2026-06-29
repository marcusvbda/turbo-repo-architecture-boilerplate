'use client'

import { createContext, ReactNode, useContext } from 'react'

const AuthContext = createContext<any>({ user: null, token: null })

export function AuthProvider({ user, children }: { user: any; children: ReactNode }) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
