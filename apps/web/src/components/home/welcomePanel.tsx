'use client'

import Heading from '@/components/ui/heading'
import { useAuth } from '@/contexts/auth'
import Divisor from '../ui/divisor'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const today = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})

export default function WelcomePanel() {
  const user = useAuth()

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {/* Rim-lit planet backdrop, bleeding off the top-left corner */}
      <div
        aria-hidden
        className="absolute -top-36 -left-64 size-[240] rounded-full pointer-events-none"
      />

      <div className="relative flex flex-col gap-4 mb-10">
        <span
          className="font-mono text-[11px] uppercase tracking-widest text-muted"
          suppressHydrationWarning
        >
          {greeting()},
        </span>
        <Heading className="text-5xl font-light">
          {user?.username}
          <span>.</span>
        </Heading>
        <span className="text-sm text-muted">{today.format(new Date())}</span>
        <Divisor className="my-10" />
        <p className="text-base text-muted leading-relaxed">
          Organize your content.
          <br />
          Create incredible experiences.
        </p>
      </div>

      <button
        type="button"
        className="group relative flex items-center gap-8 rounded-panel border border-border bg-surface/80 p-8 text-left transition-colors hover:border-accent/40 outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <span aria-hidden className="size-20 rounded-full border border-accent" />
        <span className="flex-1">
          <span className="block text-sm font-medium text-white">Need help?</span>
          <span className="block text-xs text-muted">Ask anything</span>
        </span>
        <span className="text-muted transition-transform group-hover:translate-x-2">→</span>
      </button>
    </div>
  )
}
