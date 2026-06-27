'use client'

import Card from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '@/services/auth'
import Link from 'next/link'

const schema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

interface IProps {
  token: string
}

export default function ResetPasswordForm({ token }: IProps) {
  const router = useRouter()
  const [isRedirecting, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => {
      if (!res.ok) return toast.error(res.message ?? 'Invalid or expired token')
      toast.success('Password updated! Sign in with your new password.')
      startTransition(() => router.push('/auth/signin'))
    },
    onError: () => toast.error('Something went wrong'),
  })

  if (!token) {
    return (
      <Card className="flex flex-col gap-2 m-4 w-full p-6 text-center">
        <p className="text-muted py-4">
          Invalid reset link.{' '}
          <Link href="/auth/forgot-password" className="text-accent">
            Request a new one
          </Link>
        </p>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col gap-2 m-4 w-full p-6">
      <h1 className="text-3xl">
        Reset <span className="text-accent">Password</span>
      </h1>
      <p className="text-muted pb-5">Enter your new password below.</p>
      <hr className="opacity-10 pt-5" />
      <form
        onSubmit={handleSubmit((data: any) => mutate({ token, password: data.password }))}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label>New Password</label>
          <input
            {...register('password')}
            type="password"
            className="border p-4 border-gray-100/20 rounded-sm"
          />
          {errors.password && <span className="text-xs text-warn">{errors.password.message}</span>}
        </div>

        <div className="flex flex-col">
          <label>Confirm Password</label>
          <input
            {...register('confirmPassword')}
            type="password"
            className="border p-4 border-gray-100/20 rounded-sm"
          />
          {errors.confirmPassword && (
            <span className="text-xs text-warn">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || isRedirecting}
          className="border p-4 border-gray-100/20 rounded-sm bg-accent text-white my-4"
        >
          {isPending ? 'Updating…' : isRedirecting ? 'Redirecting…' : 'Update password'}
        </button>
      </form>
    </Card>
  )
}
