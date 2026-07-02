import { cn } from '@/libs/utils'

export default function Logo({
  className = '',
  textClassName = '',
  iconClassName = '',
  pointClassName = '',
}: {
  className?: string
  textClassName?: string
  iconClassName?: string
  pointClassName?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-5 outline-none rounded-field focus-visible:ring-2 focus-visible:ring-accent/40',
        className,
      )}
    >
      <span className={cn('size-10 rounded-tag bg-accent', iconClassName)} />
      <span className={cn('text-base font-semibold tracking-[-0.02em] text-white', textClassName)}>
        Repo<span className={cn('text-accent', pointClassName)}>.</span>
      </span>
    </div>
  )
}
