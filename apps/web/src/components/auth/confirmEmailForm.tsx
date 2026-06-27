'use client'

import Card from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTransition, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { confirmEmail } from '@/services/auth'
import Link from 'next/link'

interface IProps {
  token: string
}

export default function ConfirmEmailForm({ token }: IProps) {
  const router = useRouter()
  const [isRedirecting, startTransition] = useTransition()

  const { mutate, isPending, status } = useMutation({
    mutationFn: confirmEmail,
    onSuccess: (res) => {
      if (!res.ok) return toast.error(res.message ?? 'Invalid or expired token')
      toast.success('Email confirmed! You can now sign in.')
      startTransition(() => router.push('/auth/signin'))
    },
    onError: () => toast.error('Something went wrong'),
  })

  useEffect(() => {
    if (token) mutate({ token })
  }, [])

  const confirmed = status === 'success'

  return (
    <Card className="flex flex-col gap-2 m-4 w-full p-6 text-center">
      <h1 className="text-3xl">
        Confirm <span className="text-accent">Email</span>
      </h1>

      {!token && (
        <p className="text-muted py-4">
          No token provided. Check your email for the confirmation link.
        </p>
      )}

      {token && isPending && <p className="text-muted py-4">Confirming your email…</p>}

      {token && !isPending && !confirmed && (
        <p className="text-muted py-4">
          Token invalid or expired.{' '}
          <Link href="/auth/signin" className="text-accent">
            Go to sign in
          </Link>
        </p>
      )}

      {confirmed && (
        <p className="text-muted py-4">
          {isRedirecting ? 'Redirecting to sign in…' : 'Email confirmed!'}
        </p>
      )}
    </Card>
  )
}
