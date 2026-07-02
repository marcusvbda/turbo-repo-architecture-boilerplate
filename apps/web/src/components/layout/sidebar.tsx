'use client'

import { usePathname, useRouter } from 'next/navigation'
import RawSidebar, { SidebarItem } from '../ui/raw-sidebar'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const isInHome = pathname === '/'

  return (
    <RawSidebar
      description={
        <p className="relative mt-10 text-base text-muted leading-relaxed">
          Jump straight to your pages or blog posts.
          <br />
          Everything you manage, one click away.
        </p>
      }
    >
      <div className="flex flex-col gap-4">
        <SidebarItem
          className="mb-10"
          arrowClass={isInHome ? '' : 'rotate-180 group-hover:-translate-x-2'}
          label={isInHome ? 'Home page' : 'Return to home page'}
          description="Overview & Quick Links"
          onClick={() => router.push('/')}
          active={isInHome}
        />
        <SidebarItem
          label="Pages"
          description="15 Pages, 3 Drafts"
          onClick={() => router.push('/pages')}
          active={pathname.startsWith('/pages')}
        />
        <SidebarItem
          label="Blog"
          description="15 Blogs, 3 Drafts"
          onClick={() => router.push('/blogs')}
          active={pathname.startsWith('/blogs')}
        />
      </div>
    </RawSidebar>
  )
}
