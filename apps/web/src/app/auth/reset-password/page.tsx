import ResetPasswordForm from '@/components/auth/resetPasswordForm'
import { redirect } from 'next/navigation'

type Props = { searchParams: Promise<{ token?: string }> }

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token = '' } = await searchParams

  if (!token) redirect('/auth/forgot-password')

  const res = await fetch(`${process.env.API_URL}/auth/validate-reset-token?token=${token}`, {
    cache: 'no-store',
  })

  if (!res.ok) redirect('/auth/forgot-password')

  return (
    <section className="flex self-center max-w-xl mx-auto py-20">
      <ResetPasswordForm token={token} />
    </section>
  )
}
