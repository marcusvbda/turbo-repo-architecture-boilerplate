import { cn } from '@/libs/utils'
import { ReactNode } from 'react'
import Footer from './footer'
import Navbar from './navbar'

interface IWorkspaceProps {
  /** Left zone — alerts, shortcuts, contextual info. Always visible. */
  aside: ReactNode
  /** Right zone — KPIs. Optional: when absent, the center expands. */
  kpis?: ReactNode
  /** Center zone — main content / action board. */
  children: ReactNode
}

export default function Workspace({ aside, kpis, children }: IWorkspaceProps) {
  return (
    <div className="flex flex-col min-h-dvh lg:h-dvh lg:overflow-hidden">
      <Navbar />

      <div
        className={cn(
          'w-full px-12 grid gap-16 grid-cols-1 flex-1 lg:min-h-0',
          kpis
            ? 'lg:grid-cols-[300px_minmax(0,1fr)_300px] xl:grid-cols-[350px_minmax(0,1fr)_350px]'
            : 'lg:grid-cols-[350px_minmax(0,1fr)]',
        )}
      >
        <aside className="flex flex-col gap-12 pb-16 lg:min-h-0 lg:overflow-y-auto scroll-subtle">
          {aside}
        </aside>
        <main className="flex flex-col gap-16 pb-16 min-w-0 lg:min-h-0 lg:overflow-y-auto scroll-subtle">
          {children}
        </main>
        {kpis && (
          <aside className="flex flex-col gap-12 pb-16 lg:min-h-0 lg:overflow-y-auto scroll-subtle">
            {kpis}
          </aside>
        )}
      </div>

      <Footer />
    </div>
  )
}
