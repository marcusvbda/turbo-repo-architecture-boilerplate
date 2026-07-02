'use client'

import Workspace from '@/components/ui/workspace'
import SectionLabel from '@/components/ui/section-label'
import Sidebar from '@/components/ui/sidebar'
import KpisExample from '@/components/mocks/kpis-example2'
import PagesMenu from '@/components/cms/menu'
import { toast } from 'sonner'
import QuickAction from '@/components/ui/quick-action'

export default function PagesPage() {
  return (
    <Workspace aside={<Sidebar />} kpis={<KpisExample />}>
      <div className="flex flex-col w-full">
        <SectionLabel>Pages</SectionLabel>
        <PagesMenu />
        <QuickAction
          label="Quick actions"
          items={[
            {
              label: 'Create new page',
              onClick: () => toast.success('Help'),
            },
            {
              label: 'Create new blog post',
              onClick: () => toast.success('Help'),
            },
            {
              label: 'See page drafs',
              onClick: () => toast.success('Help'),
            },
          ]}
        />
      </div>
    </Workspace>
  )
}
