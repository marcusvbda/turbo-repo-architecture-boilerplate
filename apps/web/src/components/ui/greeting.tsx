import { useAuth } from '@/contexts/auth'
import { ReactNode } from 'react'
import Heading from '@/components/ui/heading'
import Divisor from '../ui/divisor'

const greeting = () => {
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

export default function Greeting({ description }: { description?: ReactNode }): ReactNode {
  const user = useAuth()

  return (
    <div className="sticky top-0 z-10 -mt-16 flex flex-col gap-4 bg-bg pb-4">
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
      {description && description}
      <Divisor className="mt-10" />
    </div>
  )
}
