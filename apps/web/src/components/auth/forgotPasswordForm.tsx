'use client'

import AuthCard from '@/components/auth/authCard'
import Button from '@/components/ui/button'
import Field from '@/components/ui/field'
import Input from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { forgotPasswordAction } from '@/features/auth/forgot-password'
import Link from 'next/link'

const schema = z.object({ email: z.string().email() })

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: forgotPasswordAction,
    onSuccess: (res) => {
      if (!res.ok) return toast.error(res.message ?? 'Something went wrong')
    },
    onError: () => toast.error('Something went wrong'),
  })

  if (isSuccess) {
    return (
      <AuthCard
        eyebrow="Auth · Recovery"
        title={
          <>
            Check your <span>email</span>
          </>
        }
        subtitle="If that address is registered, we sent a reset link. Check your inbox."
      >
        <Link href="/auth/signin" className="text-accent text-sm hover:underline">
          Back to sign in
        </Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      eyebrow="Auth · Recovery"
      title={
        <>
          Forgot <span>Password</span>
        </>
      }
      subtitle="Enter your email and we'll send a reset link."
    >
      <form
        onSubmit={handleSubmit((data: any) => mutate(data))}
        className="w-full flex flex-col gap-8"
      >
        <Field label="Email" error={errors.email?.message}>
          <Input {...register('email')} type="email" placeholder="you@company.com" />
        </Field>

        <Button type="submit" disabled={isPending} className="my-4">
          {isPending ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>

      <p className="text-sm text-center">
        <Link href="/auth/signin" className="text-accent hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthCard>
  )
}
