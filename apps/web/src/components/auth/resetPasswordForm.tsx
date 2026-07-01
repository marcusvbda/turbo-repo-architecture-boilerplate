'use client'

import AuthCard from '@/components/auth/authCard'
import Button from '@/components/ui/button'
import Field from '@/components/ui/field'
import Input from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useMutation } from '@tanstack/react-query'
import { resetPasswordAction } from '@/features/auth/reset-password'
import Link from 'next/link'

const schema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((d) => d.password === d.confirmPassword, {
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
    mutationFn: resetPasswordAction,
    onSuccess: (res) => {
      if (!res.ok) return toast.error(res.message ?? 'error')
      toast.success('Password updated! Sign in with your new password.')
      startTransition(() => router.push('/auth/signin'))
    },
    onError: () => toast.error('Something went wrong'),
  })

  if (!token) {
    return (
      <AuthCard
        eyebrow="Auth · Recovery"
        title={
          <>
            Invalid <span>link</span>
          </>
        }
        subtitle="This reset link is invalid or has expired."
      >
        <Link href="/auth/forgot-password" className="text-accent text-sm hover:underline">
          Request a new one
        </Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      eyebrow="Auth · Recovery"
      title={
        <>
          Reset <span>Password</span>
        </>
      }
      subtitle="Enter your new password below."
    >
      <form
        onSubmit={handleSubmit((data: any) => mutate({ token, password: data.password }))}
        className="w-full flex flex-col gap-8"
      >
        <Field label="New Password" error={errors.password?.message}>
          <Input {...register('password')} type="password" placeholder="••••••••" />
        </Field>

        <Field label="Confirm Password" error={errors.confirmPassword?.message}>
          <Input {...register('confirmPassword')} type="password" placeholder="••••••••" />
        </Field>

        <Button type="submit" disabled={isPending || isRedirecting} className="my-4">
          {isPending ? 'Updating…' : isRedirecting ? 'Redirecting…' : 'Update password'}
        </Button>
      </form>
    </AuthCard>
  )
}
