import { cn } from '@/libs/utils'
import { ReactNode } from 'react'

export default function Kbd({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center min-w-11 px-3 py-1 font-mono text-[11px] text-muted bg-surface2 border border-border rounded-tag',
        className
      )}
    >
      {children}
    </kbd>
  )
}
