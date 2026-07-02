'use client'

import Workspace from '@/components/ui/workspace'
import CommandBar from '@/components/ui/command-bar'
import { toast } from 'sonner'
import SectionLabel from '@/components/ui/section-label'
import Sidebar from '@/components/ui/sidebar'
import KpisExample from '@/components/mocks/kpis-example'
import QuickAction from '@/components/ui/quick-action'

export default function HomePage() {
  return (
    <Workspace aside={<Sidebar />} kpis={<KpisExample />}>
      <div className="flex flex-col w-full">
        <SectionLabel>Dashboard</SectionLabel>
        <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-13 text-center py-42">
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
          <QuickAction
            className="py-0"
            label="Suggested prompts"
            items={[
              {
                label: 'Show me unpublished page',
                onClick: () => toast.success('Help'),
              },
              {
                label: 'Take me to SEO settings',
                onClick: () => toast.success('Help'),
              },
              {
                label: 'Create a blog post draft',
                onClick: () => toast.success('Help'),
              },
            ]}
          />
        </div>
      </div>
    </Workspace>
  )
}
