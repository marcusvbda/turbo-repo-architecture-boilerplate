'use client'

import Card from '@/components/ui/card'
import { logoutAction } from '@/features/auth/logout'
import { useAuth } from '@/contexts/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function UserMenu() {
  const user = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isRedirecting, startTransition] = useTransition()

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: logoutAction,
    onSuccess: () =>
      startTransition(() => {
        router.push('/auth/signin')
        router.refresh()
      }),
  })

  const initial = (user?.username?.[0] ?? '?').toUpperCase()

  return (
    <div className="relative" onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-6 rounded-field px-4 py-3 text-left transition-colors hover:bg-surface2/60 outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-accent/15 border border-accent/30 font-mono text-xs text-accent">
          {initial}
        </span>
        <span className="hidden sm:block leading-tight">
          <span className="block text-sm font-medium text-white">{user?.username}</span>
          <span className="block font-mono text-[10px] text-dim uppercase tracking-[0.08em]">
            signed in
          </span>
        </span>
        <span className="text-dim text-xs">▾</span>
      </button>

      {open && (
        <Card className="absolute right-0 mt-4 w-96 p-4 z-50 flex flex-col gap-2">
          <div className="px-6 py-4 border-b border-border/50">
            <p className="text-sm font-medium text-white">{user?.username}</p>
            <p className="font-mono text-[11px] text-dim">{user?.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            disabled={isPending || isRedirecting}
            className="text-left px-6 py-4 text-sm text-warn rounded-field transition-colors hover:bg-warn/10 disabled:opacity-60 outline-none focus-visible:ring-2 focus-visible:ring-warn/40"
          >
            {isPending || isRedirecting ? 'Signing out…' : 'Sign out'}
          </button>
        </Card>
      )}
    </div>
  )
}
