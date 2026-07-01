import { cn } from '@/libs/utils'
import { ReactNode } from 'react'

export type Tone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'

interface ITagProps {
  tone?: Tone
  className?: string
  children: ReactNode
}

const tones: Record<Tone, string> = {
  accent: 'text-accent bg-accent/10 border-accent/20',
  success: 'text-accent2 bg-accent2/10 border-accent2/20',
  warning: 'text-yellow bg-yellow/10 border-yellow/20',
  danger: 'text-warn bg-warn/10 border-warn/20',
  neutral: 'text-muted bg-muted/10 border-muted/20',
}

export default function Tag({ tone = 'accent', className, children }: ITagProps) {
  return (
    <span
      className={cn(
        'inline-block w-fit font-mono text-[11px] uppercase tracking-[0.08em] border rounded-tag px-5 py-1',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
