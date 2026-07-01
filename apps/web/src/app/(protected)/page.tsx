'use client'

import Callout from '@/components/ui/callout'
import Card from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import { Meta, MetaItem } from '@/components/ui/meta'
import SectionLabel from '@/components/ui/section-label'
import Tag from '@/components/ui/tag'
import { useAuth } from '@/contexts/auth'

export default function HomePage() {
  const user = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-12 py-20 flex flex-col gap-24">
      <header className="border-b border-border pb-16 flex flex-col gap-6">
        <Tag tone="success">Dashboard · v1.0</Tag>
        <Heading className="text-4xl">
          Hello, <span>{user?.username}</span>
        </Heading>
        <p className="text-muted max-w-xl">
          You are signed in. This page doubles as a living preview of the design system.
        </p>
        <Meta className="mt-6">
          <MetaItem label="User" value={user?.username} />
          <MetaItem label="Session" value="active" />
        </Meta>
      </header>

      <section className="flex flex-col gap-10">
        <SectionLabel>Tags</SectionLabel>
        <div className="flex gap-4 flex-wrap">
          <Tag>Accent</Tag>
          <Tag tone="success">Success</Tag>
          <Tag tone="warning">Warning</Tag>
          <Tag tone="danger">Danger</Tag>
          <Tag tone="neutral">Neutral</Tag>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <SectionLabel>Callouts</SectionLabel>
        <Callout label="Vision">
          Purple callout for primary context — the equivalent of the vision box in the reference
          document.
        </Callout>
        <Callout tone="success" label="Goal">
          Teal callout for goals and confirmations.
        </Callout>
      </section>

      <section className="flex flex-col gap-10">
        <SectionLabel>Cards</SectionLabel>
        <Card className="p-10">
          <h4 className="font-semibold text-white mb-2">Surface card</h4>
          <p className="text-muted text-sm">
            Base container for tasks, personas and summaries. Border, surface background, 10px
            radius.
          </p>
        </Card>
      </section>

      <footer className="border-t border-border pt-12 flex justify-between flex-wrap gap-4">
        <p className="font-mono text-[11px] text-dim">
          <span className="inline-block size-3 rounded-full bg-accent2 mr-3 align-middle" />
          Design system · living document
        </p>
        <p className="font-mono text-[11px] text-dim">Turborepo boilerplate</p>
      </footer>
    </div>
  )
}
