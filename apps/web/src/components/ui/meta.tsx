import { cn } from '@/libs/utils'
import { ReactNode } from 'react'

interface IMetaProps {
  className?: string
  children: ReactNode
}

export function Meta({ className, children }: IMetaProps) {
  return <div className={cn('flex flex-wrap gap-x-12 gap-y-4', className)}>{children}</div>
}

export function MetaItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="font-mono text-[11px] text-dim">
      {label}: <span className="text-muted">{value}</span>
    </div>
  )
}
