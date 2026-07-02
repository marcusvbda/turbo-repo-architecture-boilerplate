'use client'

import Kbd from '@/components/ui/kbd'
import { cn } from '@/libs/utils'
import { FormEvent, ReactNode } from 'react'

interface ICommandBarProps {
  placeholder?: string
  /** Helper line under the bar, e.g. example commands */
  hint?: ReactNode
  /** Called with the typed command — hook the bot here later */
  onSubmit?: (command: string) => void
  className?: string
}

export default function CommandBar({
  placeholder = 'Ask or give a command…',
  hint,
  onSubmit,
  className,
}: ICommandBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const command = String(new FormData(event.currentTarget).get('command') ?? '').trim()
    if (!command) return
    onSubmit?.(command)
    event.currentTarget.reset()
  }

  return (
    <div className={cn('flex flex-col gap-7', className)}>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-54 items-center gap-6 rounded-[28px] border border-border bg-surface/75 px-8 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_24px_80px_-56px_rgba(124,92,252,0.55)] backdrop-blur transition-colors focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/15"
      >
        <input
          name="command"
          autoComplete="off"
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent px-4 text-base text-text placeholder:text-muted outline-none"
        />
        <button
          type="submit"
          aria-label="Send command"
          className="flex size-26 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_32px_-8px_rgba(124,92,252,0.9)] transition-all duration-300 hover:bg-accent/85 hover:shadow-[0_0_36px_-4px_rgba(124,92,252,0.8)] outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-9">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </form>

      {hint && (
        <div className="flex items-center justify-between gap-8 px-8">
          <p className="text-sm text-muted">{hint}</p>
          <span className="flex gap-3">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </div>
      )}
    </div>
  )
}
