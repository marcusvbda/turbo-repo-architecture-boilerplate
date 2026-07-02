'use client'

import AuthCard from '@/components/auth/authCard'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTransition, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { confirmEmailAction } from '@/features/auth/confirm-email'
import Link from 'next/link'

interface IProps {
  token: string
}

export default function ConfirmEmailForm({ token }: IProps) {
  const router = useRouter()
  const [isRedirecting, startTransition] = useTransition()

  const { mutate, isPending, status } = useMutation({
    mutationFn: confirmEmailAction,
    onSuccess: (res) => {
      if (!res.ok) return toast.error(res.message ?? 'error')
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
    <AuthCard
      title={
        <>
          Confirm <span>Email</span>
        </>
      }
    >
      {!token && (
        <p className="text-muted text-sm">
          No token provided. Check your email for the confirmation link.
        </p>
      )}

      {token && isPending && <p className="text-muted text-sm">Confirming your email…</p>}

      {token && !isPending && !confirmed && (
        <p className="text-muted text-sm">
          Token invalid or expired.{' '}
          <Link href="/auth/signin" className="text-accent hover:underline">
            Go to sign in
          </Link>
        </p>
      )}

      {confirmed && (
        <p className="text-muted text-sm">
          {isRedirecting ? 'Redirecting to sign in…' : 'Email confirmed!'}
        </p>
      )}
    </AuthCard>
  )
}
