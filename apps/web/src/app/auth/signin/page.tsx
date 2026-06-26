import Card from '../../../components/ui/card'
import Tag from '../../../components/ui/tag'

export default function LoginPage() {
  return (
    <main>
      <h1 className="text-3xl">
        Login <span className="text-accent">Page</span>
      </h1>
      <p className="text-muted">
        Roadmap detalhado do MVP —
        <span className="text-muted/50">3h/dia nos dias úteis ~15h/semana.</span> Organizado por
        sprint com tasks, critérios de aceite e expectativas claras.
      </p>

      <Card className="flex flex-col gap-2 m-4">
        <div className="flex gap-2">
          <Tag>default</Tag>
          <Tag type="success">success</Tag>
          <Tag type="error">error</Tag>
          <Tag type="warning">warning</Tag>
        </div>
        <div>abc</div>
      </Card>
    </main>
  )
}
