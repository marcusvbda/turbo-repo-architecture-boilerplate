import { cn } from '@/libs/utils'
import { ButtonHTMLAttributes } from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const variants = {
  primary: 'bg-accent text-white hover:bg-accent/85',
  secondary: 'bg-surface2 text-text border border-border hover:border-accent/40',
  ghost: 'text-muted hover:text-text',
}

export default function Button({ variant = 'primary', className, ...props }: IButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-field px-8 py-5 text-sm font-medium transition-colors outline-none',
        'focus-visible:ring-2 focus-visible:ring-accent/40',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
