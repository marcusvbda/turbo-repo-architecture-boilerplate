'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/auth'

type ProvidersProps = {
  session: any
  children: ReactNode
}

export function Providers({ session, children }: ProvidersProps) {
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <AuthProvider session={session}>
        {children}
        <Toaster richColors />
      </AuthProvider>
    </QueryClientProvider>
  )
}
