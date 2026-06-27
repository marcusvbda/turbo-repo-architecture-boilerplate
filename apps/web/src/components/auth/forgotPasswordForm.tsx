'use client'

import Card from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '@/services/auth'
import Link from 'next/link'

const schema = z.object({ email: z.string().email() })

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (res) => {
      if (!res.ok) return toast.error(res.message ?? 'Something went wrong')
    },
    onError: () => toast.error('Something went wrong'),
  })

  if (isSuccess) {
    return (
      <Card className="flex flex-col gap-2 m-4 w-full p-6 text-center">
        <h1 className="text-3xl">
          Check your <span className="text-accent">email</span>
        </h1>
        <p className="text-muted py-4">
          If that address is registered, we sent a reset link. Check your inbox.
        </p>
        <Link href="/auth/signin" className="text-accent text-sm">
          Back to sign in
        </Link>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col gap-2 m-4 w-full p-6">
      <h1 className="text-3xl">
        Forgot <span className="text-accent">Password</span>
      </h1>
      <p className="text-muted pb-5">Enter your email and we&apos;ll send a reset link.</p>
      <hr className="opacity-10 pt-5" />
      <form
        onSubmit={handleSubmit((data: any) => mutate(data))}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label>Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@company.com"
            className="border p-4 border-gray-100/20 rounded-sm"
          />
          {errors.email && <span className="text-xs text-warn">{errors.email.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="border p-4 border-gray-100/20 rounded-sm bg-accent text-white my-4"
        >
          {isPending ? 'Sending…' : 'Send reset link'}
        </button>
      </form>

      <p className="text-sm text-center text-muted">
        <Link href="/auth/signin" className="text-accent">
          Back to sign in
        </Link>
      </p>
    </Card>
  )
}
