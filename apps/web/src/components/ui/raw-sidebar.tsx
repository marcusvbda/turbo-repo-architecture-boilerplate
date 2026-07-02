'use client'

import { ReactNode } from 'react'
import Greeting from './greeting'
import { cn } from '@/libs/utils'

export default function RawSidebar({
  children,
  description = null,
}: {
  children: ReactNode
  description?: ReactNode
}) {
  return (
    <div className="relative flex-1 flex flex-col">
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-36 -left-64 size-[240] rounded-full" />
      </div>
      <Greeting description={description} />
      <div className="mt-24 w-full">{children}</div>
    </div>
  )
}

interface ISidebarItem {
  className?: string
  arrowClass?: string
  icon?: ReactNode
  label?: ReactNode
  description?: ReactNode
  onClick?: any
  active?: boolean
}

export const SidebarItem = ({
  className = '',
  arrowClass = '',
  icon,
  label,
  description = null,
  onClick = null,
  active = false,
}: ISidebarItem): ReactNode => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'group w-full relative flex items-center gap-8 rounded-panel border border-border bg-surface/80 p-8 text-left transition-colors hover:border-accent/40 outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
        active && 'border-accent/60 bg-surface2',
        className,
      )}
    >
      {icon && icon}
      <span className="flex-1">
        <span className="block text-sm font-medium text-white">{label}</span>
        {description && <span className="block text-xs text-muted">{description}</span>}
      </span>
      <span
        className={cn(
          'text-muted transition-transform group-hover:translate-x-2 group-hover:text-accent',
          arrowClass,
        )}
      >
        →
      </span>
    </button>
  )
}
