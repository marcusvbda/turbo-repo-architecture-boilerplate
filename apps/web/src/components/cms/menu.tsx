import { usePathname, useRouter } from 'next/navigation'
import OrbitMenu from '../ui/orbit-menu'
import { cn } from '@/libs/utils'

export default function PagesMenu({ className = '' }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <OrbitMenu
      className={cn(className, 'relative -top-17')}
      items={[
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-6-6z" />
              <path d="M13 3v6h6" />
            </svg>
          ),
          label: 'Pages',
          active: pathname.startsWith('/cms/pages'),
          onSelect: () => router.push('/cms/pages'),
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
  )
}
