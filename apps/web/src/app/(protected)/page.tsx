'use client'

import Workspace from '@/components/layout/workspace'
import CommandBar from '@/components/ui/command-bar'
import { toast } from 'sonner'
import Card from '@/components/ui/card'
import SectionLabel from '@/components/ui/section-label'
import Stat from '@/components/ui/stat'
import Sidebar from '@/components/layout/sidebar'
import { SidebarItem } from '@/components/ui/raw-sidebar'

export default function HomePage() {
  return (
    <Workspace
      aside={<Sidebar />}
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
      <div className="flex flex-col w-full">
        <SectionLabel>Dashboard</SectionLabel>
        <div className="mx-auto flex w-full max-w-360 my-20 flex-col items-center gap-13 text-center py-24">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-wrap w-full mt-10">
            <SidebarItem
              icon={<span aria-hidden className="size-20 rounded-full border border-accent" />}
              label="Need help ?"
              description="Ask anything"
              onClick={() => toast.success('Help')}
            />
            <SidebarItem
              icon={<span aria-hidden className="size-20 rounded-full border border-accent" />}
              label="Need help ?"
              description="Ask anything"
              onClick={() => toast.success('Help')}
            />
            <SidebarItem
              icon={<span aria-hidden className="size-20 rounded-full border border-accent" />}
              label="Need help ?"
              description="Ask anything"
              onClick={() => toast.success('Help')}
            />
          </div>
        </div>
      </div>
    </Workspace>
  )
}
