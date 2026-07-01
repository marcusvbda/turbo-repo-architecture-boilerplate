import { cn } from '@/libs/utils'
import { ReactNode } from 'react'

interface IHeadingProps {
  className?: string
  children: ReactNode
}

/** Accent word: wrap it in a <span> — e.g. <Heading>System <span>Login</span></Heading> */
export default function Heading({ className, children }: IHeadingProps) {
  return (
    <h1
      className={cn(
        'text-3xl font-bold tracking-[-0.03em] text-white [&>span]:text-accent',
        className
      )}
    >
      {children}
    </h1>
  )
}
