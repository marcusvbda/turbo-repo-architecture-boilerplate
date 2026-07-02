'use client'

import WelcomePanel from '@/components/home/welcomePanel'
import Workspace from '@/components/layout/workspace'
import CommandBar from '@/components/ui/command-bar'
import Divisor from '@/components/ui/divisor'
import OrbitMenu from '@/components/ui/orbit-menu'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Card from '@/components/ui/card'
import SectionLabel from '@/components/ui/section-label'
import Stat from '@/components/ui/stat'

export default function HomePage() {
  const router = useRouter()

  return (
    <Workspace
      aside={<WelcomePanel />}
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
      <div className="flex flex-col gap-24">
        <SectionLabel>Dashboard</SectionLabel>
        <OrbitMenu
          items={[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-6-6z" />
                  <path d="M13 3v6h6" />
                </svg>
              ),
              label: 'Pages',
              hint: '18 pages',
              onSelect: () => router.push('/pages'),
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  <path d="M12 20h9" />
                </svg>
              ),
              label: 'Blog',
              hint: '42 posts',
              onSelect: () => toast('Blog'),
            },
          ]}
        />

        <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-13 text-center">
          <Divisor className="my-10" />
          <h2 className="text-4xl font-light text-text tracking-normal">
            O que você quer fazer hoje?
          </h2>

          <CommandBar
            className="w-full text-left"
            placeholder="Pergunte ou dê um comando..."
            hint={
              <>
                Ex.: <span className="font-medium text-text">"Ver produtos cadastrados"</span> ou{' '}
                <span className="font-medium text-text">"Criar nova página"</span>
              </>
            }
            onSubmit={(command) => toast(command)}
          />
        </div>
      </div>
    </Workspace>
  )
}
