'use client'

import Workspace from '@/components/ui/workspace'
import SectionLabel from '@/components/ui/section-label'
import Sidebar from '@/components/ui/sidebar'
import KpisExample from '@/components/mocks/kpis-example3'
import PagesMenu from '@/components/cms/menu'

export default function PagesPage() {
  return (
    <Workspace aside={<Sidebar />} kpis={<KpisExample />}>
      <div className="flex flex-col w-full">
        <SectionLabel>Pages</SectionLabel>
        <PagesMenu />
      </div>
      CONTENT HERE
    </Workspace>
  )
}
