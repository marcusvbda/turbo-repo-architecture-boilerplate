import Card from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import Logo from '@/components/ui/logo'
import { ReactNode } from 'react'

interface IAuthCardProps {
  title: ReactNode
  subtitle?: string
  children: ReactNode
}

export default function AuthCard({ title, subtitle, children }: IAuthCardProps) {
  return (
    <Card className="w-full p-14 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Logo textClassName="text-3xl" />
        <Heading>{title}</Heading>
      </div>
      {subtitle && <p className="text-muted text-sm">{subtitle}</p>}
      <hr className="border-border my-8" />
      {children}
    </Card>
  )
}
