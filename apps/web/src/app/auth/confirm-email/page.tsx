import ConfirmEmailForm from '@/components/auth/confirmEmailForm'

type Props = { searchParams: Promise<{ token?: string }> }

export default async function ConfirmEmailPage({ searchParams }: Props) {
  const { token = '' } = await searchParams
  return <ConfirmEmailForm token={token} />
}
