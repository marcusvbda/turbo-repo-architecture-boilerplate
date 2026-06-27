'use client'

import Tag from '@/components/ui/tag'
import { useAuth } from '@/contexts/auth'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <main>
      <h1 className="text-3xl">Hello : {user?.username}</h1>
      <div className="flex gap-2">
        <Tag>default</Tag>
        <Tag type="success">success</Tag>
        <Tag type="error">error</Tag>
        <Tag type="warning">warning</Tag>
      </div>
    </main>
  )
}
