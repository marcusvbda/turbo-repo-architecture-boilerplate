import Card from '@/components/ui/card'
import Stat from '@/components/ui/stat'
import SectionLabel from '@/components/ui/section-label'

export default function KpisExample2() {
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
    </>
  )
}
