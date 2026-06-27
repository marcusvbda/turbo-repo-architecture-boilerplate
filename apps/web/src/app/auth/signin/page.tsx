import LoginForm from '@/components/auth/loginForm'

type Props = { searchParams: Promise<{ callbackUrl?: string }> }

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl = '/' } = await searchParams

  return (
    <section className="flex self-center max-w-xl mx-auto py-20">
      <LoginForm callbackUrl={callbackUrl} />
    </section>
  )
}
