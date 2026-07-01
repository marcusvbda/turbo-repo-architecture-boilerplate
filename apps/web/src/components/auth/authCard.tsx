import Card from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import Tag from '@/components/ui/tag'
import { ReactNode } from 'react'

interface IAuthCardProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  children: ReactNode
}

export default function AuthCard({ eyebrow, title, subtitle, children }: IAuthCardProps) {
  return (
    <Card className="w-full p-14 flex flex-col gap-3">
      {eyebrow && (
        <Tag tone="success" className="mb-6">
          {eyebrow}
        </Tag>
      )}
      <Heading>{title}</Heading>
      {subtitle && <p className="text-muted text-sm">{subtitle}</p>}
      <hr className="border-border my-8" />
      {children}
    </Card>
  )
}
