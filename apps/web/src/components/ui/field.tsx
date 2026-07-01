import { ReactNode } from 'react'

interface IFieldProps {
  label: string
  error?: string
  children: ReactNode
}

export default function Field({ label, error, children }: IFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        {label}
      </label>
      {children}
      {error && <span className="text-xs text-warn">{error}</span>}
    </div>
  )
}
