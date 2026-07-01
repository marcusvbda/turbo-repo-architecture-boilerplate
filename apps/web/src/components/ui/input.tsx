import { cn } from '@/libs/utils'
import { InputHTMLAttributes } from 'react'

export default function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full bg-surface2/50 border border-border rounded-field px-7 py-5 text-sm text-text',
        'placeholder:text-dim outline-none transition-colors',
        'focus:border-accent focus:ring-2 focus:ring-accent/20',
        className
      )}
      {...props}
    />
  )
}
