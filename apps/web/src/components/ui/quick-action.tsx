import { cn } from '@/libs/utils'
import Divisor from './divisor'
import { SidebarItem } from './raw-sidebar'

interface IItem {
  label: string
  onClick: any
}

interface IProps {
  className?: string
  label: string
  items: IItem[]
}

export default function QuickAction({ className = '', label, items }: IProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-360 flex-col items-center gap-13 text-center pb-22',
        className,
      )}
    >
      <Divisor className="w-full" />
      <h2 className="text-xl font-light text-text tracking-normal text-left">{label}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-wrap w-full">
        {items.map((x: IItem, key: number) => {
          return <SidebarItem key={key} label={x.label} onClick={x.onClick} />
        })}
      </div>
    </div>
  )
}
