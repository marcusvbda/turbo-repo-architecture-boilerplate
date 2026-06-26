import { cn } from '@/libs/utils'
import { ReactNode } from 'react'

export interface ICardProps {
  type?: 'default' | 'success' | 'error' | 'warning'
  className?: string
  children: ReactNode
}

export default function Card({ type = 'default', className, children }: ICardProps) {
  const classColors = {
    default: 'border-accent/20 bg-accent/5',
    success: 'border-accent2/20 bg-accent2/5',
    warning: 'border-yellow/20 bg-yellow/5',
    error: 'border-warn/20 bg-warn/5',
  }
  return <div className={cn('border rounded p-4', classColors[type], className)}>{children}</div>
}
