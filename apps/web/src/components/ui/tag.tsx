import { cn } from '@/libs/utils'
import Card, { ICardProps } from './card'

export default function Tag({ type = 'default', className, children }: ICardProps) {
  const classColors = {
    default: 'text-accent bg-accent/12',
    success: 'text-accent2 bg-accent2/12',
    warning: 'text-yellow bg-yellow/12',
    error: 'text-warn bg-warn/12',
  }

  return (
    <Card type={type} className={cn(className, 'text-xs px-3 py-1 w-fit', classColors[type])}>
      {children}
    </Card>
  )
}
