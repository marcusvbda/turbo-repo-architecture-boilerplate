import ConfirmEmailForm from '@/components/auth/confirmEmailForm'

type Props = { searchParams: Promise<{ token?: string }> }

export default async function ConfirmEmailPage({ searchParams }: Props) {
  const { token = '' } = await searchParams
  return (
    <section className="flex self-center max-w-xl mx-auto py-20">
      <ConfirmEmailForm token={token} />
    </section>
  )
}
