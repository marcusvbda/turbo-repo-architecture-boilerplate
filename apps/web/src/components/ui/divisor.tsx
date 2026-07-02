import { cn } from '@/libs/utils'

export default function Divisor({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative mt-10 h-px w-full max-w-320 bg-border/70 shadow-[0_0_24px_rgba(124,92,252,0.18)]',
        className,
      )}
    >
      <span className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] bg-accent shadow-[0_0_28px_rgba(124,92,252,0.75)]" />
    </div>
  )
}
