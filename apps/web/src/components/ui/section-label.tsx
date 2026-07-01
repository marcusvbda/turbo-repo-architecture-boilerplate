import { cn } from '@/libs/utils'
import { ReactNode } from 'react'

interface ISectionLabelProps {
  className?: string
  children: ReactNode
}

export default function SectionLabel({ className, children }: ISectionLabelProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.1em] text-accent',
        "after:content-[''] after:flex-1 after:h-px after:bg-border",
        className
      )}
    >
      {children}
    </div>
  )
}
