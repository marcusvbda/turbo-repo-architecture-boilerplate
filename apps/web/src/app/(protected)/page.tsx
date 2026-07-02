'use client'

import Workspace from '@/components/layout/workspace'
import Button from '@/components/ui/button'
import Callout from '@/components/ui/callout'
import Card from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import SectionLabel from '@/components/ui/section-label'
import Stat from '@/components/ui/stat'
import Tag from '@/components/ui/tag'
import { useAuth } from '@/contexts/auth'

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

export default function HomePage() {
  const user = useAuth()

  return (
    <Workspace
      aside={
        <>
          <div className="flex flex-col gap-4" suppressHydrationWarning>
            <span className="font-mono text-[11px] uppercase tracking-widest text-dim">
              {greeting()},
            </span>
            <Heading className="text-4xl">
              {user?.username}
              <span>.</span>
            </Heading>
            <span className="font-mono text-[11px] text-muted">{today.format(new Date())}</span>
          </div>

          <p className="text-muted text-sm border-t border-border pt-8">
            Organize your work. Everything in one place.
          </p>

          <Callout tone="success" label="All clear">
            No pending alerts right now.
          </Callout>

          <div className="flex flex-col gap-4">
            <SectionLabel>Shortcuts</SectionLabel>
            <Button variant="secondary">New item</Button>
            <Button variant="secondary">Settings</Button>
          </div>
        </>
      }
      kpis={
        <>
          <SectionLabel>Overview</SectionLabel>
          <Card className="px-10 py-4">
            <Stat label="Visitors" value="12,430" delta="↑ 12.5%" />
            <Stat label="Pageviews" value="28,721" delta="↑ 8.2%" />
            <Stat label="Conversion" value="3.28%" delta="↓ 1.1%" deltaTone="danger" />
          </Card>

          <SectionLabel>Recent activity</SectionLabel>
          <Card className="px-10 py-6 flex flex-col">
            {[
              ['Page "About us" updated', '2h ago'],
              ['New post "Release v2.0"', '5h ago'],
              ['Image "hero-bg.jpg" uploaded', '6h ago'],
            ].map(([text, when]) => (
              <div
                key={text}
                className="flex items-center justify-between gap-8 py-5 border-b border-border/50 last:border-0"
              >
                <span className="text-sm text-muted">{text}</span>
                <span className="font-mono text-[10px] text-dim whitespace-nowrap">{when}</span>
              </div>
            ))}
          </Card>
        </>
      }
    >
      <div className="flex flex-col gap-8 text-center py-16">
        <h2 className="text-2xl font-semibold text-white tracking-[-0.02em]">
          What do you want to do today?
        </h2>
        <p className="text-muted text-sm">Pick an action below to get started.</p>
      </div>

      <SectionLabel>Action board</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {[
          ['Pages', '18 pages', 'accent'],
          ['Blog', '42 posts', 'success'],
          ['Media', '342 files', 'warning'],
          ['Menus', '7 menus', 'neutral'],
          ['Templates', '14 templates', 'accent'],
          ['Users', '9 members', 'success'],
        ].map(([title, count, tone]) => (
          <Card
            key={title}
            className="p-10 flex flex-col gap-4 transition-colors hover:border-accent/40 cursor-pointer"
          >
            <h4 className="font-semibold text-white">{title}</h4>
            <Tag tone={tone as 'accent'}>{count}</Tag>
          </Card>
        ))}
      </div>
    </Workspace>
  )
}
