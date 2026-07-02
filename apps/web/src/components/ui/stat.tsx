import Tag, { Tone } from '@/components/ui/tag'
import { ReactNode } from 'react'

interface IStatProps {
  label: string
  value: ReactNode
  delta?: string
  deltaTone?: Tone
}

export default function Stat({ label, value, delta, deltaTone = 'success' }: IStatProps) {
  return (
    <div className="flex items-center justify-between gap-8 py-6 border-b border-border/50 last:border-0">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-dim">{label}</div>
        <div className="text-xl font-semibold text-white">{value}</div>
      </div>
      {delta && <Tag tone={deltaTone}>{delta}</Tag>}
    </div>
  )
}
