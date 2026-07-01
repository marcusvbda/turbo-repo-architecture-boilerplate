import LoginForm from '@/components/auth/loginForm'

type Props = { searchParams: Promise<{ callbackUrl?: string }> }

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl = '/' } = await searchParams

  return <LoginForm callbackUrl={callbackUrl} />
}
