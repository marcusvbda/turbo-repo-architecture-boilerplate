import { cn } from '@/libs/utils'
import { ReactNode } from 'react'

interface ICardProps {
  className?: string
  children: ReactNode
}

export default function Card({ className, children }: ICardProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-card', className)}>{children}</div>
  )
}
