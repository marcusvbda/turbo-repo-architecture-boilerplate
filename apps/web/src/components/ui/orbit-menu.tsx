'use client'

import Card from '@/components/ui/card'
import { cn } from '@/libs/utils'
import { CSSProperties, ReactNode } from 'react'

export interface IOrbitMenuAction {
  label: string
  onSelect: () => void
}

export interface IOrbitMenuItem {
  icon: ReactNode
  label: string
  hint?: string
  /** Highlighted like the center item of the reference — accent ring + glow */
  featured?: boolean
  /** Marks this item as the current page */
  active?: boolean
  /** Shown in a popover on hover/focus */
  /** Called when the orb itself is clicked */
  onSelect?: () => void
}

interface IOrbitMenuProps {
  items: IOrbitMenuItem[]
  className?: string
}

export default function OrbitMenu({ items, className }: IOrbitMenuProps) {
  const mid = (items.length - 1) / 2

  return (
    <nav className={cn('relative flex justify-center py-10', className)}>
      {/* Faint orbit line behind the orbs */}
      <div
        aria-hidden
        className="absolute inset-x-6 top-24 h-160 rounded-[50%] border-t border-border/60 pointer-events-none"
      />

      <ul className="relative flex items-start justify-center gap-14 flex-wrap">
        {items.map((item, index) => (
          <li
            key={item.label}
            style={{ '--arc': `${Math.abs(index - mid) * 14}px` } as CSSProperties}
            className="group relative flex flex-col items-center gap-6 sm:translate-y-(--arc) transition-transform duration-300"
          >
            <button
              type="button"
              onClick={item.onSelect}
              aria-label={item.label}
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'flex items-center justify-center rounded-full border bg-surface2 text-text',
                'transition-all duration-500 ease-out outline-none [&_svg]:size-11',
                'hover:border-accent hover:text-white hover:-translate-y-2 hover:shadow-[0_0_44px_-6px_rgba(124,92,252,0.6)]',
                'focus-visible:border-accent focus-visible:text-white focus-visible:shadow-[0_0_44px_-6px_rgba(124,92,252,0.6)]',
                item.featured
                  ? 'size-40 border-accent/70 text-white shadow-[0_0_50px_-8px_rgba(124,92,252,0.55)] [&_svg]:size-13'
                  : 'size-32 border-border',
                item.active &&
                  'border-accent text-white shadow-[0_0_44px_-6px_rgba(124,92,252,0.6)]',
              )}
            >
              {item.icon}
            </button>

            <span className="flex flex-col items-center gap-1 text-center">
              <span className="text-sm font-medium text-white">{item.label}</span>
              {item.hint && <span className="font-mono text-[11px] text-dim">{item.hint}</span>}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
