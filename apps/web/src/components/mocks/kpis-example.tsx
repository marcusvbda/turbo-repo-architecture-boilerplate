import Card from '@/components/ui/card'
import Stat from '@/components/ui/stat'
import SectionLabel from '@/components/ui/section-label'

export default function KpisExample() {
  return (
    <>
      <SectionLabel>Overview</SectionLabel>
      <p className="relative ext-base text-muted leading-relaxed">
        This is an example of the selected feature KPIS.
      </p>
      <Card className="px-10 py-4">
        <Stat label="Visitors" value="12,430" delta="↑ 12.5%" />
        <Stat label="Pageviews" value="28,721" delta="↑ 8.2%" />
        <Stat label="Conversion" value="3.28%" delta="↓ 1.1%" deltaTone="danger" />
      </Card>

      <SectionLabel>Recent activity</SectionLabel>
      <Card className="px-10 py-6 flex flex-col">
        {[
          ['Page "About us" updated', '2h ago'],
          ['New post "Release v2.0"', '5h ago'],
          ['Image "hero-bg.jpg" uploaded', '6h ago'],
        ].map(([text, when]) => (
          <div
            key={text}
            className="flex items-center justify-between gap-8 py-5 border-b border-border/50 last:border-0"
          >
            <span className="text-sm text-muted">{text}</span>
            <span className="font-mono text-[10px] text-dim whitespace-nowrap">{when}</span>
          </div>
        ))}
      </Card>
    </>
  )
}
