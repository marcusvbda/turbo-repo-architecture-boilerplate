'use client'

import Workspace from '@/components/layout/workspace'
import OrbitMenu from '@/components/ui/orbit-menu'
import SectionLabel from '@/components/ui/section-label'
import Sidebar from '@/components/layout/sidebar'

export default function PagesPage() {
  return (
    <Workspace aside={<Sidebar />}>
      <div className="flex flex-col w-full">
        <SectionLabel>Pages</SectionLabel>
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
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-6-6z" />
                  <path d="M13 3v6h6" />
                </svg>
              ),
              label: 'Blogs',
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-6-6z" />
                  <path d="M13 3v6h6" />
                </svg>
              ),
              label: 'SEO',
            },
          ]}
        />
      </div>
    </Workspace>
  )
}
