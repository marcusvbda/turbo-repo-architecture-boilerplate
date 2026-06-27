'use client'

import { createContext, ReactNode, useContext } from 'react'

const AuthContext = createContext<any>({ user: null, token: null })

export function AuthProvider({ session, children }: { session: any; children: ReactNode }) {
  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
