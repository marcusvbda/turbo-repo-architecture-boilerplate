import { cn } from '@/libs/utils'
import { ReactNode } from 'react'
import { Tone } from './tag'

interface ICalloutProps {
  tone?: Tone
  label?: string
  className?: string
  children: ReactNode
}

const boxTones: Record<Tone, string> = {
  accent: 'bg-accent/5 border-accent/20',
  success: 'bg-accent2/5 border-accent2/20',
  warning: 'bg-yellow/5 border-yellow/20',
  danger: 'bg-warn/5 border-warn/20',
  neutral: 'bg-muted/5 border-muted/20',
}

const labelTones: Record<Tone, string> = {
  accent: 'text-accent',
  success: 'text-accent2',
  warning: 'text-yellow',
  danger: 'text-warn',
  neutral: 'text-muted',
}

export default function Callout({ tone = 'accent', label, className, children }: ICalloutProps) {
  return (
    <div className={cn('border rounded-panel px-10 py-8', boxTones[tone], className)}>
      {label && (
        <div
          className={cn(
            'font-mono text-[11px] uppercase tracking-[0.08em] mb-4',
            labelTones[tone]
          )}
        >
          {label}
        </div>
      )}
      <div className="text-sm text-text">{children}</div>
    </div>
  )
}
