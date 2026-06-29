'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/auth'

type ProvidersProps = {
  user: any
  children: ReactNode
}

export function Providers({ user, children }: ProvidersProps) {
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <AuthProvider user={user}>
        {children}
        <Toaster richColors />
      </AuthProvider>
    </QueryClientProvider>
  )
}
